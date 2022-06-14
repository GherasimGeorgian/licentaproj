export interface ProductProps {
    id: number;
    denumire: string;
    descriere:string;
    pret:number;
    url_image:string;
    stoc:number;
  }
  
export interface IServerToDoDataProduct {
    id: number;
    denumire: string;
    descriere:string;
    pret:number;
    url_image:string;
    stoc:boolean;
}
  