var dbBagitugas = null;
var KEY = Math.random().toString(36).substring(7);

if (typeof firebase !== 'undefined') {

    const firebaseConfig = {
        apiKey: "AIzaSyC9FeUBhIpZil0RgJoSg1ahnRwEr-P2miY",
        authDomain: "bagitugas-app.firebaseapp.com",
        databaseURL: "https://bagitugas-app.firebaseio.com",
        projectId: "bagitugas-app",
        storageBucket: "bagitugas-app.appspot.com",
        messagingSenderId: "106511037524",
        appId: "1:106511037524:web:0c62ddb81444a7a9"
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    dbBagitugas = db.collection(DEV ? 'bagitugas-dev' : 'bagitugas').doc(SATKER.toString());

    var initialLoad = true;

    dbBagitugas.onSnapshot((snap, a) => {
        if (initialLoad) {
            initialLoad = false;
        } else if (!!snap._document) {
            let {
                user = '', key = '', msg = ''
            } = snap.data();
            if (user && key !== KEY && msg) {
                if ($modal.hasClass('show')) modalHiddenAction = () => {
                    announced(msg)
                };
                else announced(msg);
            }
        }
    });

}

function announced(msg) {
    $.ajax({
        type: 'POST',
        data: {
            mulai: moment(tglGantt[0]).format(f0),
            akhir: moment(tglGantt[1]).format(f0),
        },
        url: 'api/get-data',
        success: res => {
            console.info('Response from api/refresh', res);
            if (res.surat && res.pegawai && res.mitra) {
                surat = res.surat;
                pegawai = res.pegawai;
                mitra = res.mitra;
                setting = res.setting;
                refresh();
            } else notif('Gagal sinkronisasi data', 'danger', 1, {
                delay: 1000
            });
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Gagal sinkronisasi data', 'danger', 1, {
                delay: 1000
            });
        }
    });
    notif(msg, 'wait', 0, {
        delay: 2000
    }, {
        icon: 'icon-refresh'
    });
}

function announce(msg) {
    if (typeof dbBagitugas !== 'undefined') {
        dbBagitugas.set({
            user: NIP,
            key: KEY,
            time: (new Date).getTime(),
            msg: `${ME.nama||'Seseorang'} memperbarui ${msg||'data'}.<br>Sistem akan melakukan sinkronisasi...`
        });
    }
}