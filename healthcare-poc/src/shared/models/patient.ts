export interface Patient{
      patientId:number;
      patientCode:string;
      firstName:string;
      middleName:string;
      surname:string;
      emailId:string;
      contactNumber:string;
      gender:Gender;
      age:number;
      image:Image;
      oxygenData:Array<OxygenData>;
    }
    export interface OxygenData
    {
      date:string;
      oxygenDataId:number;
      patientId:number;
      rate:number;
    }
    export interface Image
    {
         imageName:string
          imagePath:string; 
    }

    export enum Gender{
        Male=1,
        Female=2,
        Custom=3
    }