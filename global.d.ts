type Fetched<T> = T | undefined;

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type GamePreview = {
  _id: string;
  publishDate: string;
};

type Game = {
  _id: string;
  publishDate: string;
};
