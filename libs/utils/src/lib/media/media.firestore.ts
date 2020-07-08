export type ImgSizeDirectory = 'lg' | 'md' | 'xs' | 'original' | 'fallback';
export const imgSizeDirectory: ImgSizeDirectory[] = ['lg', 'md', 'xs', 'original', 'fallback'];

export interface ImgRef {
  ref: string;
  urls: {
    original: string;
    fallback?: string;
    xs?: string;
    md?: string;
    lg?: string;
  };
}

// @todo(#3063) remove this interface
export interface OldImgRef {
  ref: string;
  url: string;
}

export function createImgRef(ref: Partial<ImgRef> | string = {}): ImgRef {
  const _ref = typeof ref === 'string' ? { urls: { original: ref } } : ref;
  return {
    ref: '',
    urls: {
      original: '',
      xs: '',
      md: '',
      lg: '',
    },
    ..._ref
  };
}

export function getImgSize(url: string) {
  if (url.includes('avatar')) {
    return { original: 0, xs: 50, md: 100, lg: 300, fallback: 1024 };
  } else if (url.includes('logo')) {
    return { original: 0, xs: 50, md: 100, lg: 300, fallback: 1024 };
  } else if (url.includes('poster')) {
    return { original: 0, xs: 200, md: 400, lg: 600, fallback: 1024 };
  } else if (url.includes('banner')) {
    return { original: 0, xs: 300, md: 600, lg: 1200, fallback: 1024 };
  } else if (url.includes('still')) {
    return { original: 0, xs: 50, md: 100, lg: 200, fallback: 1024 };
  } else {
    throw new Error('No bucket directory, exiting function');
  }
}