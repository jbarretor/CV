import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  saveImage(path: string, $event: any){
    const file = $event.target.files[0]
    console.log(file)
    const imgRef = ref(this.storage, path + file.name)

    return uploadBytes(imgRef, file)
  }

  getImage(path: string){
    const imgRef = ref(this.storage, path)

    return listAll(imgRef)
  }
}
