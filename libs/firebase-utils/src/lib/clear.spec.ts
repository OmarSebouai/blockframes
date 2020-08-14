import { initFunctionsTestMock } from '@blockframes/testing/firebase/functions';

describe('Clear DB', () => {
  beforeAll(async () => {
    //Init local emulator
    initFunctionsTestMock();

  })
  it('Should clear everything', async () => {
    expect(true).toBeFalsy();
  })
})