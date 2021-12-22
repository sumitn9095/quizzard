"use strict";(self.webpackChunkquizzard=self.webpackChunkquizzard||[]).push([[445],{8445:(Qe,ae,l)=>{l.d(ae,{e:()=>Ge});var T=l(8937),o=l(5e3),oe=l(4986),le=l(8306),E=l(8996),J=l(9646),c=l(5813),N=l(8675),de=l(4482),ue=l(5403);function U(){return(0,de.e)((s,e)=>{let t,r=!1;s.subscribe(new ue.Q(e,i=>{const a=t;t=i,r&&e.next([a,i]),r=!0}))})}var g=l(4004),G=l(5026),he=l(1884),j=l(9300),b=l(2011),ce=l(9808),fe=(l(5881),l(3942)),n=l(5525),Q=l(2090),ge=l(4859);function M(s,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new n.WA("invalid-argument",`Invalid options passed to function ${s}(): You cannot specify both "merge" and "mergeFields".`);return e}function K(){if("undefined"==typeof Uint8Array)throw new n.WA("unimplemented","Uint8Arrays are not available in this environment.")}function V(){if(!(0,n.Me)())throw new n.WA("unimplemented","Blobs are unavailable in Firestore in this environment.")}class I{constructor(e){this._delegate=e}static fromBase64String(e){return V(),new I(n.Jj.fromBase64String(e))}static fromUint8Array(e){return K(),new I(n.Jj.fromUint8Array(e))}toBase64(){return V(),this._delegate.toBase64()}toUint8Array(){return K(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}function R(s){return function(s,e){if("object"!=typeof s||null===s)return!1;const t=s;for(const r of["next","error","complete"])if(r in t&&"function"==typeof t[r])return!0;return!1}(s)}class ye{enableIndexedDbPersistence(e,t){return(0,n.ST)(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return(0,n.fH)(e._delegate)}clearIndexedDbPersistence(e){return(0,n.Fc)(e._delegate)}}class Z{constructor(e,t,r){this._delegate=t,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof n.l7||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();!e.merge&&t.host!==e.host&&(0,n.yq)("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&delete(e=Object.assign(Object.assign({},t),e)).merge,this._delegate._setSettings(e)}useEmulator(e,t,r={}){(0,n.at)(this._delegate,e,t,r)}enableNetwork(){return(0,n.Ix)(this._delegate)}disableNetwork(){return(0,n.TF)(this._delegate)}enablePersistence(e){let t=!1,r=!1;return e&&(t=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,(0,n.Wi)("synchronizeTabs",t,"experimentalForceOwningTab",r)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return(0,n.Mx)(this._delegate)}onSnapshotsInSync(e){return(0,n.sc)(this._delegate,e)}get app(){if(!this._appCompat)throw new n.WA("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new _(this,(0,n.hJ)(this._delegate,e))}catch(t){throw u(t,"collection()","Firestore.collection()")}}doc(e){try{return new f(this,(0,n.JU)(this._delegate,e))}catch(t){throw u(t,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new h(this,(0,n.B$)(this._delegate,e))}catch(t){throw u(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return(0,n.i3)(this._delegate,t=>e(new Y(this,t)))}batch(){return(0,n.qY)(this._delegate),new H(new n.PU(this._delegate,e=>(0,n.GL)(this._delegate,e)))}loadBundle(e){return(0,n.Pb)(this._delegate,e)}namedQuery(e){return(0,n.L$)(this._delegate,e).then(t=>t?new h(this,t):null)}}class D extends n.u7{constructor(e){super(),this.firestore=e}convertBytes(e){return new I(new n.Jj(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return f.forKey(t,this.firestore,null)}}class Y{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new D(e)}get(e){const t=y(e);return this._delegate.get(t).then(r=>new A(this._firestore,new n.xU(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,t.converter)))}set(e,t,r){const i=y(e);return r?(M("Transaction.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const a=y(e);return 2===arguments.length?this._delegate.update(a,t):this._delegate.update(a,t,r,...i),this}delete(e){const t=y(e);return this._delegate.delete(t),this}}class H{constructor(e){this._delegate=e}set(e,t,r){const i=y(e);return r?(M("WriteBatch.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const a=y(e);return 2===arguments.length?this._delegate.update(a,t):this._delegate.update(a,t,r,...i),this}delete(e){const t=y(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class v{constructor(e,t,r){this._firestore=e,this._userDataWriter=t,this._delegate=r}fromFirestore(e,t){const r=new n.$q(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new F(this._firestore,r),null!=t?t:{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const r=v.INSTANCES;let i=r.get(e);i||(i=new WeakMap,r.set(e,i));let a=i.get(t);return a||(a=new v(e,new D(e),t),i.set(t,a)),a}}v.INSTANCES=new WeakMap;class f{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new D(e)}static forPath(e,t,r){if(e.length%2!=0)throw new n.WA("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new f(t,new n.my(t._delegate,r,new n.Ky(e)))}static forKey(e,t,r){return new f(t,new n.my(t._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new _(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new _(this.firestore,(0,n.hJ)(this._delegate,e))}catch(t){throw u(t,"collection()","DocumentReference.collection()")}}isEqual(e){return(e=(0,Q.m9)(e))instanceof n.my&&(0,n.Eo)(this._delegate,e)}set(e,t){t=M("DocumentReference.set",t);try{return t?(0,n.pl)(this._delegate,e,t):(0,n.pl)(this._delegate,e)}catch(r){throw u(r,"setDoc()","DocumentReference.set()")}}update(e,t,...r){try{return 1===arguments.length?(0,n.r7)(this._delegate,e):(0,n.r7)(this._delegate,e,t,...r)}catch(i){throw u(i,"updateDoc()","DocumentReference.update()")}}delete(){return(0,n.oe)(this._delegate)}onSnapshot(...e){const t=X(e),r=k(e,i=>new A(this.firestore,new n.xU(this.firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,this._delegate.converter)));return(0,n.cf)(this._delegate,t,r)}get(e){let t;return t="cache"===(null==e?void 0:e.source)?(0,n.kl)(this._delegate):"server"===(null==e?void 0:e.source)?(0,n.Xk)(this._delegate):(0,n.QT)(this._delegate),t.then(r=>new A(this.firestore,new n.xU(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new f(this.firestore,this._delegate.withConverter(e?v.getInstance(this.firestore,e):null))}}function u(s,e,t){return s.message=s.message.replace(e,t),s}function X(s){for(const e of s)if("object"==typeof e&&!R(e))return e;return{}}function k(s,e){var t,r;let i;return i=R(s[0])?s[0]:R(s[1])?s[1]:"function"==typeof s[0]?{next:s[0],error:s[1],complete:s[2]}:{next:s[1],error:s[2],complete:s[3]},{next:a=>{i.next&&i.next(e(a))},error:null===(t=i.error)||void 0===t?void 0:t.bind(i),complete:null===(r=i.complete)||void 0===r?void 0:r.bind(i)}}class A{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new f(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return(0,n.qK)(this._delegate,e._delegate)}}class F extends A{data(e){const t=this._delegate.data(e);return(0,n.K9)(void 0!==t,"Document in a QueryDocumentSnapshot should exist"),t}}class h{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new D(e)}where(e,t,r){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.ar)(e,t,r)))}catch(i){throw u(i,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.Xo)(e,t)))}catch(r){throw u(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.b9)(e)))}catch(t){throw u(t,"limit()","Query.limit()")}}limitToLast(e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.vh)(e)))}catch(t){throw u(t,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.e0)(...e)))}catch(t){throw u(t,"startAt()","Query.startAt()")}}startAfter(...e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.TQ)(...e)))}catch(t){throw u(t,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.Lx)(...e)))}catch(t){throw u(t,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new h(this.firestore,(0,n.IO)(this._delegate,(0,n.Wu)(...e)))}catch(t){throw u(t,"endAt()","Query.endAt()")}}isEqual(e){return(0,n.iE)(this._delegate,e._delegate)}get(e){let t;return t="cache"===(null==e?void 0:e.source)?(0,n.UQ)(this._delegate):"server"===(null==e?void 0:e.source)?(0,n.zN)(this._delegate):(0,n.PL)(this._delegate),t.then(r=>new W(this.firestore,new n.W(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const t=X(e),r=k(e,i=>new W(this.firestore,new n.W(this.firestore._delegate,this._userDataWriter,this._delegate,i._snapshot)));return(0,n.cf)(this._delegate,t,r)}withConverter(e){return new h(this.firestore,this._delegate.withConverter(e?v.getInstance(this.firestore,e):null))}}class _e{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new F(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class W{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new h(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new F(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(t=>new _e(this._firestore,t))}forEach(e,t){this._delegate.forEach(r=>{e.call(t,new F(this._firestore,r))})}isEqual(e){return(0,n.qK)(this._delegate,e._delegate)}}class _ extends h{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new f(this.firestore,e):null}doc(e){try{return new f(this.firestore,void 0===e?(0,n.JU)(this._delegate):(0,n.JU)(this._delegate,e))}catch(t){throw u(t,"doc()","CollectionReference.doc()")}}add(e){return(0,n.ET)(this._delegate,e).then(t=>new f(this.firestore,t))}isEqual(e){return(0,n.Eo)(this._delegate,e._delegate)}withConverter(e){return new _(this.firestore,this._delegate.withConverter(e?v.getInstance(this.firestore,e):null))}}function y(s){return(0,n.Cf)(s,n.my)}class B{constructor(...e){this._delegate=new n.Lz(...e)}static documentId(){return new B(n.Xb.keyField().canonicalString())}isEqual(e){return(e=(0,Q.m9)(e))instanceof n.Lz&&this._delegate._internalPath.isEqual(e._internalPath)}}class w{constructor(e){this._delegate=e}static serverTimestamp(){const e=(0,n.Bt)();return e._methodName="FieldValue.serverTimestamp",new w(e)}static delete(){const e=(0,n.AK)();return e._methodName="FieldValue.delete",new w(e)}static arrayUnion(...e){const t=(0,n.vr)(...e);return t._methodName="FieldValue.arrayUnion",new w(t)}static arrayRemove(...e){const t=(0,n.Ab)(...e);return t._methodName="FieldValue.arrayRemove",new w(t)}static increment(e){const t=(0,n.nP)(e);return t._methodName="FieldValue.increment",new w(t)}isEqual(e){return this._delegate.isEqual(e._delegate)}}const Ie={Firestore:Z,GeoPoint:n.F8,Timestamp:n.EK,Blob:I,Transaction:Y,WriteBatch:H,DocumentReference:f,DocumentSnapshot:A,Query:h,QueryDocumentSnapshot:F,QuerySnapshot:W,CollectionReference:_,FieldPath:B,FieldValue:w,setLogLevel:function(s){(0,n.Ub)(s)},CACHE_SIZE_UNLIMITED:n.IX};var s;(function(s,e){s.INTERNAL.registerComponent(new ge.wA("firestore-compat",t=>((e,t)=>new Z(e,t,new ye))(t.getProvider("app-compat").getImmediate(),t.getProvider("firestore").getImmediate()),"PUBLIC").setServiceProps(Object.assign({},Ie)))})(s=fe.Z),s.registerVersion("@firebase/firestore-compat","0.1.10");var p=l(1205),Se=l(7128);function ee(s,e){return function(s,e=oe.z){return new le.y(t=>{let r;return null!=e?e.schedule(()=>{r=s.onSnapshot({includeMetadataChanges:!0},t)}):r=s.onSnapshot({includeMetadataChanges:!0},t),()=>{null!=r&&r()}})}(s,e)}function q(s,e){return ee(s,e).pipe((0,g.U)(t=>({payload:t,type:"query"})))}function L(s,e){return q(s,e).pipe((0,N.O)(void 0),U(),(0,g.U)(([t,r])=>{const i=r.payload.docChanges(),a=i.map(d=>({type:d.type,payload:d}));return t&&JSON.stringify(t.payload.metadata)!==JSON.stringify(r.payload.metadata)&&r.payload.docs.forEach((d,m)=>{const S=i.find(C=>C.doc.ref.isEqual(d.ref)),O=null==t?void 0:t.payload.docs.find(C=>C.ref.isEqual(d.ref));S&&JSON.stringify(S.doc.metadata)===JSON.stringify(d.metadata)||!S&&O&&JSON.stringify(O.metadata)===JSON.stringify(d.metadata)||a.push({type:"modified",payload:{oldIndex:m,newIndex:m,type:"modified",doc:d}})}),a}))}function te(s,e,t){return L(s,t).pipe((0,G.R)((r,i)=>function(s,e,t){return e.forEach(r=>{t.indexOf(r.type)>-1&&(s=function(s,e){switch(e.type){case"added":if(!s[e.newIndex]||!s[e.newIndex].doc.ref.isEqual(e.doc.ref))return $(s,e.newIndex,0,e);break;case"modified":if(null==s[e.oldIndex]||s[e.oldIndex].doc.ref.isEqual(e.doc.ref)){if(e.oldIndex!==e.newIndex){const t=s.slice();return t.splice(e.oldIndex,1),t.splice(e.newIndex,0,e),t}return $(s,e.newIndex,1,e)}break;case"removed":if(s[e.oldIndex]&&s[e.oldIndex].doc.ref.isEqual(e.doc.ref))return $(s,e.oldIndex,1)}return s}(s,r))}),s}(r,i.map(a=>a.payload),e),[]),(0,he.x)(),(0,g.U)(r=>r.map(i=>({type:i.type,payload:i}))))}function $(s,e,t,...r){const i=s.slice();return i.splice(e,t,...r),i}function re(s){return(!s||0===s.length)&&(s=["added","removed","modified"]),s}l(127);class se{constructor(e,t,r){this.ref=e,this.query=t,this.afs=r}stateChanges(e){let t=L(this.query,this.afs.schedulers.outsideAngular);return e&&e.length>0&&(t=t.pipe((0,g.U)(r=>r.filter(i=>e.indexOf(i.type)>-1)))),t.pipe((0,N.O)(void 0),U(),(0,j.h)(([r,i])=>i.length>0||!r),(0,g.U)(([r,i])=>i),c.iC)}auditTrail(e){return this.stateChanges(e).pipe((0,G.R)((t,r)=>[...t,...r],[]))}snapshotChanges(e){const t=re(e);return te(this.query,t,this.afs.schedulers.outsideAngular).pipe(c.iC)}valueChanges(e={}){return q(this.query,this.afs.schedulers.outsideAngular).pipe((0,g.U)(t=>t.payload.docs.map(r=>e.idField?Object.assign(Object.assign({},r.data()),{[e.idField]:r.id}):r.data())),c.iC)}get(e){return(0,E.D)(this.query.get(e)).pipe(c.iC)}add(e){return this.ref.add(e)}doc(e){return new ne(this.ref.doc(e),this.afs)}}class ne{constructor(e,t){this.ref=e,this.afs=t}set(e,t){return this.ref.set(e,t)}update(e){return this.ref.update(e)}delete(){return this.ref.delete()}collection(e,t){const r=this.ref.collection(e),{ref:i,query:a}=ie(r,t);return new se(i,a,this.afs)}snapshotChanges(){return function(s,e){return ee(s,e).pipe((0,N.O)(void 0),U(),(0,g.U)(([t,r])=>r.exists?(null==t?void 0:t.exists)?{payload:r,type:"modified"}:{payload:r,type:"added"}:{payload:r,type:"removed"}))}(this.ref,this.afs.schedulers.outsideAngular).pipe(c.iC)}valueChanges(e={}){return this.snapshotChanges().pipe((0,g.U)(({payload:t})=>e.idField?Object.assign(Object.assign({},t.data()),{[e.idField]:t.id}):t.data()))}get(e){return(0,E.D)(this.ref.get(e)).pipe(c.iC)}}class De{constructor(e,t){this.query=e,this.afs=t}stateChanges(e){return e&&0!==e.length?L(this.query,this.afs.schedulers.outsideAngular).pipe((0,g.U)(t=>t.filter(r=>e.indexOf(r.type)>-1)),(0,j.h)(t=>t.length>0),c.iC):L(this.query,this.afs.schedulers.outsideAngular).pipe(c.iC)}auditTrail(e){return this.stateChanges(e).pipe((0,G.R)((t,r)=>[...t,...r],[]))}snapshotChanges(e){const t=re(e);return te(this.query,t,this.afs.schedulers.outsideAngular).pipe(c.iC)}valueChanges(e={}){return q(this.query,this.afs.schedulers.outsideAngular).pipe((0,g.U)(r=>r.payload.docs.map(i=>e.idField?Object.assign({[e.idField]:i.id},i.data()):i.data())),c.iC)}get(e){return(0,E.D)(this.query.get(e)).pipe(c.iC)}}const Le=new o.OlP("angularfire2.enableFirestorePersistence"),Oe=new o.OlP("angularfire2.firestore.persistenceSettings"),Pe=new o.OlP("angularfire2.firestore.settings"),Te=new o.OlP("angularfire2.firestore.use-emulator");function ie(s,e=(t=>t)){return{query:e(s),ref:s}}let Ne=(()=>{class s{constructor(t,r,i,a,d,m,S,O,C,Me,Re,We,Be,qe,$e,ze,Ye){this.schedulers=S;const P=(0,b.on)(t,m,r),z=C;Me&&(0,p.nw)(P,m,Re,Be,qe,$e,We,ze),[this.firestore,this.persistenceEnabled$]=(0,b.cc)(`${P.name}.firestore`,"AngularFirestore",P.name,()=>{const x=m.runOutsideAngular(()=>P.firestore());if(a&&x.settings(a),z&&x.useEmulator(...z),i&&!(0,ce.PM)(d)){const Je=()=>{try{return(0,E.D)(x.enablePersistence(O||void 0).then(()=>!0,()=>!1))}catch(je){return"undefined"!=typeof console&&console.warn(je),(0,J.of)(!1)}};return[x,m.runOutsideAngular(Je)]}return[x,(0,J.of)(!1)]},[a,z,i])}collection(t,r){let i;i="string"==typeof t?this.firestore.collection(t):t;const{ref:a,query:d}=ie(i,r),m=this.schedulers.ngZone.run(()=>a);return new se(m,d,this)}collectionGroup(t,r){const i=r||(d=>d),a=this.firestore.collectionGroup(t);return new De(i(a),this)}doc(t){let r;r="string"==typeof t?this.firestore.doc(t):t;const i=this.schedulers.ngZone.run(()=>r);return new ne(i,this)}createId(){return this.firestore.collection("_").doc().id}}return s.\u0275fac=function(t){return new(t||s)(o.LFG(b.Dh),o.LFG(b.xv,8),o.LFG(Le,8),o.LFG(Pe,8),o.LFG(o.Lbi),o.LFG(o.R0b),o.LFG(c.HU),o.LFG(Oe,8),o.LFG(Te,8),o.LFG(p.zQ,8),o.LFG(p.Qv,8),o.LFG(p.L6,8),o.LFG(p._Q,8),o.LFG(p.rT,8),o.LFG(p.lh,8),o.LFG(p.f7,8),o.LFG(Se.nm,8))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac,providedIn:"any"}),s})();var Ue=l(541);let Ge=(()=>{class s{constructor(t,r,i,a){this.afs=t,this.afAuth=r,this.router=i,this.ngZone=a,this.afAuth.authState.subscribe(d=>d&&1==d.emailVerified?(this.userData=d,localStorage.setItem("user",JSON.stringify(this.userData)),localStorage.getItem("user"),console.log(`${d} --- IS signed-in`),this.router.navigate(["../application/quizround/1"]),!0):(localStorage.removeItem("user"),this.router.navigate(["../auth/"]),!1))}signIn(t,r){return this.afAuth.signInWithEmailAndPassword(t,r).then(i=>{this.ngZone.run(()=>{this.router.navigate(["../../../application/quizround/1"])})}).catch(i=>{window.alert(i.message)})}SetUserData(t){return this.afs.doc(`users/${t.uid}`).set({uid:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL,emailVerified:t.emailVerified},{merge:!0})}GoogleAuth(){return this.AuthLogin(new T.hJ)}FacebookAuth(){return this.AuthLogin(new T._O)}GithubAuth(){return this.AuthLogin(new T.GH)}AuthLogin(t){return this.afAuth.signInWithPopup(t).then(r=>{console.log("You have been successfully logged in!")}).catch(r=>{console.log(r)})}signUp(t,r){return this.afAuth.createUserWithEmailAndPassword(t,r).then(i=>{var a;null===(a=i.user)||void 0===a||a.sendEmailVerification().then(()=>{this.router.navigate(["../../../auth/verify"])})}).catch(i=>{window.alert(i.message)})}signOut(){return this.afAuth.signOut().then(()=>{localStorage.removeItem("user"),localStorage.removeItem("user_score"),localStorage.removeItem("user_game_progress"),this.router.navigate(["../../../auth"])})}}return s.\u0275fac=function(t){return new(t||s)(o.LFG(Ne),o.LFG(p.zQ),o.LFG(Ue.F0),o.LFG(o.R0b))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);