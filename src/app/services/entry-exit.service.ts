import { Injectable } from '@angular/core';
import 'firebase/firestore'
import {AngularFirestore} from "@angular/fire/firestore";
import {EntryExit} from "../models/entry-exit.model";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  constructor(private firestore: AngularFirestore,
              private autService: AuthService) { }

  createEntryExit(entryExit: EntryExit){
      const uid = this.autService.user.uid;
      delete entryExit.uid
      return this.firestore.doc(`${uid}/entry-egress`)
        .collection('items')
        .add({...entryExit});
  }

  initEntryExit(user: User){
    return this.firestore.collection(`${user.uid}/entry-egress/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map( doc=>
          ({uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        ))
      )
  }

  eraseEntryExit(uidItem: string){
      const uid = this.autService.user.uid;
      return this.firestore.doc(`${uid}/entry-egress/items/${uidItem}`).delete();
  }



}
