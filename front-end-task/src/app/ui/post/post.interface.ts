export interface PostDataInterface {
  userId: number | string;
  id: number;
  title: string;
  body: string;
}

export interface WallIdInterface {
  wallId: number;
  data: PostDataInterface;
}
