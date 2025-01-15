export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface News {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface Interview {
  _id: string;
  title: string;
  videoLink: string;
  description: string;
  date: string;
}
