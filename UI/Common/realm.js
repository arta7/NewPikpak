import Realm from 'realm';

const realm = new Realm({
    path:  'Pikpak.realm'
    ,
    //'BankErrorDatabase10.realm',
    schema: [
      {
        name: 'Counting',
        properties: {
          id: { type: 'int', default: 0 },
          Counter:'string',
        },
        
      },


    ],
  })


  export default realm;