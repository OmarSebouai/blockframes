import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { startWith } from 'rxjs/operators';
import { Contract, getTotalPrice } from '../+state';
import { MatPaginator } from '@angular/material/paginator';
import { Price } from '@blockframes/utils/common-interfaces/price';
import { DistributionRightQuery } from '@blockframes/distribution-rights/+state';
import { MovieQuery } from '@blockframes/movie/+state/movie.query';
import { getMovieTitleList } from '@blockframes/movie/+state/movie.model';

const columns = {
  buyerName: 'Buyer name',
  territories: 'Territories',
  creationDate: 'Date of creation',
  moviesLenght: ' # Films',
  titles: 'Titles',
  price: 'Price',
  paid: 'Paid',
  status: 'Status'
} as const;

type ColumnsKeys = keyof typeof columns;

const baseColumns : ColumnsKeys[] = [
  'territories',
  'creationDate',
  'moviesLenght',
  'titles',
  'price',
  'paid',
  'status'
];

@Component({
  selector: '[source] contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractListComponent implements OnInit, AfterViewInit {
  public columns: Partial<typeof columns> = columns;
  public initialColumns: ColumnsKeys[] = baseColumns;
  public displayedColumns$: Observable<string[]>;
  public dataSource: MatTableDataSource<Contract>;
  public columnFilter = new FormControl([]);

  // quick fix to remove buyer name in marketplace
  // @todo(#1744) improve this quick fix when switching to bf-table
  @Input() displayBuyer: boolean;

  @Input()
  set source(contracts: Contract[]) {
    this.dataSource = new MatTableDataSource(contracts);
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieQuery: MovieQuery, private rightQuery: DistributionRightQuery) {}

  ngOnInit() {
    this.columnFilter.patchValue(this.initialColumns);
    this.displayedColumns$ = this.columnFilter.valueChanges.pipe(startWith(this.initialColumns));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Returns the conctract licensee name. */
  public getBuyerName(contract: Contract): string {
    const buyer = contract.parties.find(({party}) => party.role === 'licensee').party;
    return buyer.displayName;
  }

  /** Returns the total price of the contract. */
  public getContractTotalPrice(contract: Contract): Price {
    return getTotalPrice(contract.lastVersion.titles);
  }

  /** Returns all the eligible territories of the contract. */
  public getContractTerritories(contract: Contract): string[] {
    return this.rightQuery.getTerritoriesFromContract(contract.lastVersion);
  }

  /** Returns a list of movie's names of the contract. */
  public getMovieNames(contract: Contract): string[] {
    const movies = this.movieQuery.getAll({ filterBy: movie => contract.titleIds.includes(movie.id) });
    return getMovieTitleList(movies);
  }
}
