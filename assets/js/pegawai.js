var pegawaiByNip = pegawai.reduce((obj, {
    nipbps,
    nip: a,
    ...rest
}) => (obj[nipbps] = {
    nip: nip(a).print(),
    ...rest
}, obj), {});

const ME = pegawaiByNip[NIP] || {
    nama: NIP,
    username: NIP
};

var pegawaiTable,
    mitraTable;



/*
------------------------------------------------------------------------
ORGANIK
------------------------------------------------------------------------
*/

const modalViewPegawai = nipbps => {
    console.info(pegawaiByNip[nipbps]);
    let {
        nip,
        username,
        nama,
        urlfoto,
        satker,
        pangkat,
        golongan,
        seksi,
        jabatan,
        level,
        login_terakhir
    } = pegawaiByNip[nipbps];
    modal({
        title: nama,
        body: `
			<div class="text-center">
				<div class="avatar avatar-xxl">
					<img src="https://community.bps.go.id/images/avatar/${urlfoto}" alt="..." class="avatar-img rounded-circle opos-top">
				</div>
				<h3 class="mt-2 mb-0">${nama}</h3>
				<div class="text-muted mb-2">${jabatan}</div>
				<div class="text-primary"><i class="fas fa-envelope mr-2"></i>${username? username+'@bps.go.id' : '-'}</div>
				<div class="fz-13">NIP. ${nip}<div class="d-inline-block mx-1">/</div>${nipbps}</div>
			</div>
		`,
        primaryBtn: 'd-none',
        secondaryBtnLabel: 'Tutup',
        modalDialog: 'modal-sm',
    })
}

const modalEditPegawai = nipbps => {
    let {
        nip,
        urlfoto,
        seksi,
        urutan,
        nama,
        username,
        jabatan,
        golongan,
        pangkat,
        level = '6'
    } = pegawaiByNip[nipbps] || {};
    const getInputField = (label, {
        name,
        value,
        maxlength = 64,
        inputmode,
        placeholder
    }) => `
		<div class="row mb-2-3">
			<div class="col-2 mt-1">${label}</div>
			<div class="col-10">
				<input
					class="form-control form-control-sm"
					type="text"
					name="${name}"
					value="${value||''}"
					maxlength="${maxlength}"
					${inputmode? `inputmode="${inputmode}" ` : ''}
					${placeholder? `placeholder="${placeholder}" ` : ''}
				>
			</div>
		</div>`;
    modal({
        title: nipbps ? 'Edit Pegawai' : 'Tambah Pegawai',
        body: `
			<div class="form-edit">
				${nipbps? `<input type="hidden" class="d-none" name="id" value="${nipbps}">` : ''}
				${getInputField('No. Urut', { name: 'urutan', value: urutan, inputmode: 'numeric', maxlength: 3 })}
				${getInputField('Nama', { name: 'nama', value: nama, maxlength: 48 })}
				${getInputField('NIP BPS', { name: 'nipbps', value: nipbps, inputmode: 'numeric', maxlength: 9, placeholder: '(9 digit)' })}
				${getInputField('NIP PNS', { name: 'nip', value: (nip||'').replace(/\s/g,''), inputmode: 'numeric', maxlength: 18, placeholder: '(18 digit)' })}
				${getInputField('Username', { name: 'username', value: username, maxlength: 24 })}
				${getInputField('Jabatan', { name: 'jabatan', value: jabatan })}
				${getInputField('Golongan', { name: 'golongan', value: golongan })}
				${getInputField('Pangkat', { name: 'pangkat', value: pangkat })}
				${getInputField('URL Foto', { name: 'urlfoto', value: urlfoto })}
				<div class="row mb-2-3">
					<div class="col-2 mt-1">${SATKER.substr(2)==='00'?'Bidang':'Seksi'}</div>
					<div class="col-10">${selectpickerSeksi(seksi)}</div>
				</div>
				<div class="row">
					<div class="col-2 mt-1">Peran</div>
					<div class="col-10">
						<select class="selectpicker" data-width="100%" data-style="btn-light btn-sm" name="level">
							<option value="4" ${level==='4'? 'selected' : ''}>Administrator</option>
							<option value="5" ${level==='5'? 'selected' : ''}>Editor</option>
							<option value="6" ${level==='6'? 'selected' : ''}>Viewer</option>
						</select>
					</div>
				</div>
			</div>
		`,
        primaryBtn: 'submit-pegawai-btn',
        primaryBtnLabel: nipbps ? 'Simpan Perubahan' : 'Simpan',
        data: {
            'shown.bs.modal': () => {
                $('#modal [name="urutan"]').focus();
            }
        },
    });
}

const modalEditPegawaiProcessData = () => {
    $('#modal .has-error').removeClass('has-error');
    let ok = 1,
        data = {
            id: $('#modal [name="id"]').val(),
            urutan: parseInt($('#modal [name="urutan"]').val()),
            nama: $('#modal [name="nama"]').val(),
            nipbps: $('#modal [name="nipbps"]').val(),
            nip: $('#modal [name="nip"]').val(),
            username: $('#modal [name="username"]').val(),
            jabatan: $('#modal [name="jabatan"]').val(),
            golongan: $('#modal [name="golongan"]').val(),
            pangkat: $('#modal [name="pangkat"]').val(),
            urlfoto: $('#modal [name="urlfoto"]').val(),
            seksi: $('#modal [name="seksi"]').val(),
            level: $('#modal [name="level"]').val(),
        };
    if (!data.urutan) {
        $('#modal [name="urutan"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.nama) {
        $('#modal [name="nama"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!/\d{9}/.test(data.nipbps)) {
        $('#modal [name="nipbps"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!/\d{18}/.test(data.nip)) {
        $('#modal [name="nip"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.username) {
        $('#modal [name="username"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.jabatan) {
        $('#modal [name="jabatan"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.golongan) {
        $('#modal [name="golongan"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.pangkat) {
        $('#modal [name="pangkat"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.seksi) {
        $('#modal [name="seksi"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (ok) return data;
}

const modalDeletePegawai = nipbps => {
    let {
        nama,
        jabatan
    } = pegawaiByNip[nipbps] || {};
    console.info('Hapus', nipbps);
    modal({
        data: {
            nipbps
        },
        title: 'Hapus Pegawai',
        body: `Apakah Anda yakin akan menghapus<br><span class="text-primary fw-600">${nama}</span> ${jabatan}?`,
        primaryBtn: 'btn-danger hapus-pegawai-ok-btn',
        primaryBtnLabel: 'Ya',
        modalDialog: 'modal-sm',
    });
}

const modalRefreshPegawai = () => {
    modal({
        title: 'Refresh Data Pegawai',
        body: 'Sistem akan mengurutkan ulang dan memperbaiki data pegawai yang tidak sesuai atau belum lengkap',
        primaryBtn: 'btn-success refresh-pegawai-ok-btn',
        primaryBtnLabel: 'Ya',
        modalDialog: 'modal-sm',
    });
}

const submitPegawai = (data) => {
    console.log(data);
    const [url, message] = data.id ?
        ['api/update-pegawai', 'Memproses data pegawai...'] :
        ['api/add-pegawai', 'Menambahkan data pegawai...'];
    $.ajax({
        type: 'POST',
        data,
        url,
        success: res => {
            console.info(`Response from ${url}`, res);
            if (res.success) {
                delete res.success;
                if (data.id) {
                    let i = pegawai.findIndex(a => a.nipbps === res.nipbps);
                    pegawai[i] = res;
                } else {
                    pegawai.push(res);
                }
                refreshPegawai();
                notif('Data pegawai berhasil diperbarui', 'success', 1);
                announce('data pegawai');
                setTimeout(() => {
                    location.reload();
                }, 600);
            } else if (!data.id && res.data) {
                notif(`Pegawai dengan NIP ${data.nipbps} telah dipakai oleh <span class="fw-600">BPS ${res.data}</span>`, 'danger', 1);
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif(message, 'wait');
}

const deletePegawai = data => {
    $.ajax({
        type: 'POST',
        data: {
            nipbps: data.nipbps
        },
        url: 'api/delete-pegawai',
        success: res => {
            console.info('Response from api/delete-pegawai', res);
            if (res.success) {
                pegawai.splice(pegawai.findIndex(a => a.id === res.id), 1);
                refreshPegawai();
                notif('Data pegawai berhasil dihapus', 'success', 1);
                announce('data pegawai');
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Menghapus data pegawai...', 'wait');
}

const refreshDataPegawai = () => {
    $.ajax({
        type: 'POST',
        data: {},
        url: 'satker/refresh',
        success: res => {
            console.info('Response from satker/refresh', res);
            if (Array.isArray(res)) {
                pegawai = res;
                refreshPegawai();
                announce('data pegawai');
                notif('Data pegawai berhasil diperbarui', 'success', 1);
            } else notif('Terjadi kesalahan', 'danger', 1);
            $('#refresh-data-pegawai-btn').hide();
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
            $('#refresh-data-pegawai-btn').hide();
        }
    });
    notif('Melakukan sinkronisasi data pegawai...', 'wait');
}



/*
------------------------------------------------------------------------
MITRA
------------------------------------------------------------------------
*/

const modalEditMitra = ({
    id = '',
    kec = '',
    nama = '',
    asal = '',
    no_hp = '',
    nik = '',
    no_rek = '',
    npwp = ''
}) => {
    if (id && !nama) {
        modalEditMitra(mitra.find(a => a.id == id));
        return false;
    }
    modal({
        title: id ? 'Edit Mitra' : 'Tambah Mitra Baru',
        body: `
			<div class="form-edit">
				<input type="hidden" class="d-none" name="id" value="${id}">
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">Nama</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="nama" value="${nama}"></div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">Kecamatan</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="kec" value="${kec}"></div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">Asal</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="asal" value="${asal}"></div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">No. Hp</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="no_hp" value="${no_hp}"></div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">NIK</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="nik" value="${nik}"></div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3 mt-1 text-right-bold">No. Rekening</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="no_rek" value="${no_rek||''}"></div>
				</div>
				<div class="row">
					<div class="col-3 mt-1 text-right-bold">NPWP</div>
					<div class="col-9"><input type="text" class="form-control form-control-sm" name="npwp" value="${npwp||''}"></div>
				</div>
			</div>
		`,
        primaryBtn: 'submit-mitra-btn',
        primaryBtnLabel: id ? 'Simpan Perubahan' : 'Simpan',
        data: {
            'shown.bs.modal': () => {
                $('#modal [name="kec"]').autocomplete({
                    source: autoc.kec
                });
                $('#modal [name="nama"]').focus();
            }
        },
    });
}

const modalEditMitraProcessData = () => {
    $('#modal .has-error').removeClass('has-error');
    let ok = 1,
        data = {
            id: $('#modal [name="id"]').val(),
            kec: $('#modal [name="kec"]').val(),
            nama: $('#modal [name="nama"]').val(),
            asal: $('#modal [name="asal"]').val(),
            no_hp: $('#modal [name="no_hp"]').val(),
            nik: $('#modal [name="nik"]').val(),
            no_rek: $('#modal [name="no_rek"]').val(),
            npwp: $('#modal [name="npwp"]').val(),
        };
    if (!data.kec) {
        $('#modal [name="kec"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (!data.nama) {
        $('#modal [name="nama"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (ok) return data;
}

const modalDeleteMitra = id => {
    let {
        nama,
        kec
    } = mitra.find(a => a.id == id);
    console.info('Hapus', id);
    modal({
        data: {
            id
        },
        title: 'Hapus Mitra',
        body: `Apakah Anda yakin akan menghapus<br><span class="text-primary fw-600">${nama}</span> dari ${kec}?`,
        primaryBtn: 'btn-danger hapus-mitra-ok-btn',
        primaryBtnLabel: 'Ya',
        modalDialog: 'modal-sm',
    });
}

const submitMitra = data => {
    $.ajax({
        type: 'POST',
        data,
        url: 'api/save-mitra',
        success: res => {
            console.info('Response from api/save-mitra', res);
            if (res.success) {
                delete res.success;
                if (data.id) {
                    mitra[mitra.findIndex(a => a.id === res.id)] = res;
                    refreshPegawai();
                    notif('Data mitra berhasil diperbarui', 'success', 1);
                    announce('data pegawai');
                } else {
                    mitra.push(res);
                    refreshPegawai();
                    notif('Data mitra baru berhasil dibuat', 'success', 1);
                    announce('data pegawai');
                }
                refresh();
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Memproses data mitra...', 'wait');
}

const deleteMitra = data => {
    $.ajax({
        type: 'POST',
        data: {
            id: data.id
        },
        url: 'api/delete-mitra',
        success: res => {
            console.info('Response from api/delete-mitra', res);
            if (res.success) {
                mitra.splice(mitra.findIndex(a => a.id === res.id), 1);
                refreshPegawai();
                notif('Data mitra berhasil dihapus', 'success', 1);
                announce('data pegawai');
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Menghapus data mitra...', 'wait');
}


const exportMitra = () => {
    let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet([
            ['Nama', 'Kecamatan', 'Asal Desa/Kelurahan', 'No. Hp', 'NIK', 'No. Rekening', 'NPWP'],
            ...mitra.map(a => [a.nama, a.kec, a.asal, a.no_hp, a.nik, a.no_rek, a.npwp])
        ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Mitra ' + SATKER);
    XLSX.writeFile(wb, 'BagiTugas - Mitra ' + moment().format('YYYYMMDD-HHmm') + '.xlsx');
}



/*
------------------------------------------------------------------------
DOM
------------------------------------------------------------------------
*/

$(() => {

    $gantt
        .on('click', '.desc[data-id]', function() {
            modalViewPegawai($(this).data('id'));
        });

    $('.tambah-pegawai-btn').click(() => {
        modalEditPegawai();
    });

    $('.tambah-mitra-btn').click(() => {
        modalEditMitra({});
    });

    $modal
        .on('click', '.submit-pegawai-btn', function() {
            let data = modalEditPegawaiProcessData();
            if (data) {
                $modalBtn[0].prop('disabled', true).blur();
                $modal.modal('hide');
                submitPegawai(data);
            }
        })
        .on('click', '.hapus-pegawai-ok-btn', function() {
            let data = $modal.data();
            $modalBtn[0].prop('disabled', true).blur();
            $modal.modal('hide');
            console.log('deleteMitra()');
            deletePegawai(data);
        })
        .on('click', '.refresh-pegawai-ok-btn', function() {
            $('#refresh-data-pegawai-btn').prop('disabled', true).html('<i class="fas fa-sync fa-spin fa-fw"></i>');
            $modal.modal('hide');
            refreshDataPegawai();
        })
        .on('click', '.submit-mitra-btn', function() {
            let data = modalEditMitraProcessData();
            if (data) {
                $modalBtn[0].prop('disabled', true).blur();
                $modal.modal('hide');
                submitMitra(data);
            }
        })
        .on('click', '.hapus-mitra-ok-btn', function() {
            let data = $modal.data();
            $modalBtn[0].prop('disabled', true).blur();
            $modal.modal('hide');
            console.log('deleteMitra()');
            deleteMitra(data);
        });

    $('#refresh-data-pegawai-btn').click(function() {
        if ($(this).prop('disabled')) return;
        modalRefreshPegawai();
    })

    pegawaiTable = $('#table-pegawai').DataTable(LV < 5 ? {
        data: pegawai,
        rowId: 'nipbps',
        pageLength: 50,
        columns: [{
            title: 'No',
            data: 'urutan',
        }, {
            title: 'Nama / NIP',
            data: null,
            render: ({
                nipbps,
                nip,
                nama
            }) => `<div class="hover:underline cur-p text-primary" onclick="modalViewPegawai(${nipbps})">${nama}</div><div class="text-muted fz-10">${nip}</div>`
        }, {
            title: 'Email',
            data: 'username',
            render: username => username + '<span class="text-muted">@bps.go.id</span>'
        }, {
            title: 'Jabatan',
            data: 'jabatan',
        }, {
            title: 'Pangkat / Golongan',
            data: null,
            render: ({
                pangkat,
                golongan
            }) => `<div>${pangkat}</div><div class="text-muted fz-10">${golongan}</div>`
        }, {
            title: 'Peran',
            data: 'level',
            render: level => ['', 'Top Manager', 'Developer', 'Supervisor', 'Administrator', 'Editor', 'Viewer'][level]
        }, {
            title: '',
            data: null,
            searchable: false,
            sortable: false,
            render: ({
                nipbps
            }) => `<i class="fas fa-pen fa-fw py-1 cur-p fz-16 text-primary mr-2" title="Edit" onclick="modalEditPegawai(${nipbps})"></i><i class="fas fa-trash fa-fw py-1 cur-p fz-16 text-danger" title="Hapus" onclick="modalDeletePegawai(${nipbps})"></i>`
            // render: ({ nipbps }) => `<i class="fas fa-pen fa-fw py-1 cur-p fz-16 text-primary" title="Edit" onclick="modalEditPegawai(${nipbps})"></i>`
        }],
    } : {
        data: pegawai,
        rowId: 'nipbps',
        pageLength: 50,
        columns: [{
            title: 'No',
            data: 'urutan',
        }, {
            title: 'Nama / NIP',
            data: null,
            render: ({
                nipbps,
                nip,
                nama
            }) => `<div class="hover:underline cur-p text-primary" onclick="modalViewPegawai(${nipbps})">${nama}</div><div class="text-muted fz-10">${nip}</div>`
        }, {
            title: 'Email',
            data: 'username',
            render: username => username + '<span class="text-muted">@bps.go.id</span>'
        }, {
            title: 'Jabatan',
            data: 'jabatan',
        }, {
            title: 'Pangkat / Golongan',
            data: null,
            render: ({
                pangkat,
                golongan
            }) => `<div>${pangkat}</div><div class="text-muted fz-10">${golongan}</div>`
        }, {
            title: 'Peran',
            data: 'level',
            render: level => ['', 'Top Manager', 'Developer', 'Supervisor', 'Administrator', 'Editor', 'Viewer'][level]
        }],
    });

    mitraTable = $('#table-mitra').DataTable(LV < 5 ? {
        data: mitra,
        rowId: 'id',
        order: [],
        pageLength: 25,
        columns: [{
            title: 'Nama',
            data: 'nama',
        }, {
            title: 'Asal',
            data: null,
            render: ({
                kec,
                asal
            }) => `${kec}<div class="text-muted fz-11">${asal}</div>`
        }, {
            title: 'No. Hp',
            data: 'no_hp',
        }, {
            title: 'NIK',
            data: 'nik',
        }, {
            title: 'No. Rekening',
            data: 'no_rek',
        }, {
            title: 'NPWP',
            data: 'npwp',
        }, {
            title: '',
            data: null,
            searchable: false,
            sortable: false,
            render: ({
                id
            }) => `<i class="fas fa-pen fa-fw py-1 cur-p fz-16 text-primary mr-2" title="Edit" onclick="modalEditMitra({id:${id}})"></i><i class="fas fa-trash fa-fw py-1 cur-p fz-16 text-danger" title="Hapus" onclick="modalDeleteMitra(${id})"></i>`
        }],
    } : {
        data: mitra,
        rowId: 'id',
        order: [],
        columns: [{
            title: 'Nama',
            data: 'nama',
        }, {
            title: 'Asal',
            data: null,
            render: ({
                kec,
                asal
            }) => `${kec}<div class="text-muted fz-11">${asal}</div>`
        }, {
            title: 'No. Hp',
            data: 'no_hp',
        }, {
            title: 'NIK',
            data: 'nik',
        }, {
            title: 'No. Rekening',
            data: 'no_rek',
        }, {
            title: 'NPWP',
            data: 'npwp',
        }],
    });

});