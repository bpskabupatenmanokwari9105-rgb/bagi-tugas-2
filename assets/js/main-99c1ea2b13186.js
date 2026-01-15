{
    let $link = document.querySelector('link[href*="main.css"]');
    if ($link) console.info('Version: ' + ($link.href || '').split('?v=')[1]);
}



const TODAY = moment().format('DD/MM/YYYY');
const PREVWEEK = moment().subtract(7, 'days');
const IS_WEEKEND = moment().day() === 0 || moment().day() === 6;

var autoc = {}



/*
------------------------------------------------------------------------
ROUTES
------------------------------------------------------------------------
*/

const urlParams = new URLSearchParams(window.location.search);
const urlBase = (document.getElementsByTagName('base')[0] || {}).href;
const urlPath = (path = null) => path === null ? window.location.href.split('?')[0].split('#')[0].split(urlBase).join('') : path === window.location.href.split('?')[0].split('#')[0].split(urlBase).join('');
const urlHost = window.location.host;

const $routes = $('[data-route]');
const $navLinks = $('#nav > .nav-item');
const $navToggler = $('.sidenav-toggler');

const route = (href, push = true) => {
    window.scrollTo(0, 0);
    let $route = $(`[data-route="${href}"]`),
        $navLink = $navLinks.find(`[href="${href}"]`).parent();

    if ($route.length === 0) $route = $('[data-route="404"]');

    $routes.hide();
    $route.show();
    $navLinks.removeClass('active');
    $navLink.addClass('active');
    document.documentElement.classList.remove('nav_open');
    $navToggler.removeClass('toggled');
    nav_open = 0; // Minimize Sidebar

    document.title = $route.data('title');

    if (push) window.history.pushState(null, document.title, urlBase + href);

    if (href === '' && ganttNotRendered) renderGantt({
        pegawai,
        surat,
        libur,
        tglGantt,
        ganttItems
    });
}

window.onpopstate = function(e) {
    route(urlPath(), false);
};

$(() => {

    $(document)
        .on('click', '[data-custom-link][data-group="main"]', function(e) {
            e.preventDefault();
            let href = $(this).attr('href');
            if (!urlPath(href)) route(href);
        })
        .on('click', '.page-inner[data-route]', function(e) {
            document.documentElement.classList.remove('nav_open');
            $navToggler.removeClass('toggled');
            nav_open = 0; // Minimize Sidebar
        });

    route(urlPath(), false);

    refresh();

});



/*
------------------------------------------------------------------------
COMPONENTS
------------------------------------------------------------------------
*/

const $modal = $('#modal'),
    $modalDialog = $('#modal > .modal-dialog'),
    $modalTitle = $('#modal-title'),
    $modalBody = $('#modal-body'),
    $modalBtn = [$('#modal-footer > .btn-primary'), $('#modal-footer > .btn-default')],
    $modalBtnBefore = $('#modal-footer > .d-flex');

var modalHiddenAction = false;

const modal = ({
    title,
    body,
    data = {},
    primaryBtn = '',
    primaryBtnLabel = 'Ok',
    secondaryBtn = '',
    secondaryBtnLabel = 'Batal',
    modalDialog = '',
    misc = ''
}) => {
    $modalTitle.html(title);
    $modalBody.html(body);
    $modalBtn[0].html(primaryBtnLabel).attr('class', 'btn btn-primary').addClass(primaryBtn);
    $modalBtn[1].html(secondaryBtnLabel).attr('class', 'btn btn-default').addClass(secondaryBtn);
    $modalBtnBefore.html(misc);
    $modalDialog.attr('class', 'modal-dialog').addClass(modalDialog);
    return $modal.data(data).modal('show');
}
if ($modal.length) $modal
    .on('hidden.bs.modal', e => {
        $modalBtn[0].removeData().prop('disabled', false);
        $modal.removeData();
        if (modalHiddenAction) modalHiddenAction();
        modalHiddenAction = false;
    })
    .on('shown.bs.modal', e => {
        if ($modal.data('shown.bs.modal')) $modal.data('shown.bs.modal')();
    })
    .on('show.bs.modal', e => {
        $modal.find('.selectpicker').selectpicker('render');
        if ($modal.data('show.bs.modal')) $modal.data('show.bs.modal')();
    });

$.notifyDefaults({
    placement: {
        from: 'bottom'
    },
    animate: {
        enter: 'animated fadeInUp',
        exit: 'animated fadeOutDown'
    },
});

const notif = (message, type, close = false, settings, options) => {
    if (close) $.notifyClose();
    let icon = 'icon-info';
    if (type === 'wait') {
        icon = 'icon-hourglass';
        type = 'info';
    }
    if (type === 'success') {
        icon = 'icon-check';
    }
    if (type === 'danger') {
        icon = 'icon-exclamation';
    }
    $.notify({
        message,
        icon,
        ...options
    }, {
        type,
        ...settings
    });
}



/*
------------------------------------------------------------------------
LIBRARIES
------------------------------------------------------------------------
*/

$.fn.datepicker.defaults.maxViewMode = 1;
$.fn.datepicker.defaults.format = 'dd/mm/yyyy';
$.fn.datepicker.defaults.startDate = '01/01/2019';
$.fn.datepicker.defaults.endDate = NEXTMONTH;
$.fn.datepicker.defaults.language = 'id';
$.fn.datepicker.defaults.weekStart = 1;

$.extend(true, $.fn.dataTable.defaults, {
    dom: "<'row'<'col'l><'col'f>>r<'table-responsive't><'row'<'col'i><'col'p>>",
    language: {
        decimal: ',',
        thousands: '.',
        lengthMenu: 'Menampilkan _MENU_ data',
        search: 'Cari',
        info: 'Halaman _PAGE_ dari _PAGES_',
        infoFiltered: '(disaring dari total _MAX_ data)',
        infoEmpty: 'Menampilkan 0 hasil',
        paginate: {
            previous: '<i class="fas fa-chevron-left"></i>',
            next: '<i class="fas fa-chevron-right"></i>'
        },
        zeroRecords: 'Tidak ada hasil',
        emptyTable: 'Tidak ada data',
        select: {
            rows: {
                _: '%d surat dipilih',
                0: '',
            }
        },
    },
});

if (typeof numeral !== 'undefined') {
    numeral.register('locale', 'id', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'Rb',
            million: 'Jt',
            billion: 'M',
            trillion: 'T'
        },
        currency: {
            symbol: 'Rp&nbsp;'
        }
    });
    numeral.locale('id');
}



/*
------------------------------------------------------------------------
HELPER FUNCTIONS
------------------------------------------------------------------------
*/

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}



/*
------------------------------------------------------------------------
HELPER FUNCTIONS (RELATED TO PROJECT)
------------------------------------------------------------------------
*/

const getNomorSurat = (no, tgl, jenis = null) => {
    let mm = moment(tgl).format('MM'),
        yy = moment(tgl).format('YYYY');
    if (setting.sistem === 2) return no.replace('{BB}', mm).replace('{MM}', mm).replace('{TTTT}', yy).replace('{YYYY}', yy);
    if (jenis === 'spd') return [no, mm, 'SPD', yy].join('/');
    if (jenis === 'pws') return no === '-' ? '-' : [no, mm, 'ST', 'PWS', yy].join('/');
    return no === '-' ? '-' : [no, mm, 'ST', yy].join('/');
}

const getWaktu = (mulai, akhir = null) => {
    if (akhir == null || mulai === akhir) return moment(mulai).format('D MMMM YYYY');
    let tMulai = moment(mulai).format('D MMMM YYYY').split(' '),
        tAkhir = moment(akhir).format('D MMMM YYYY').split(' ');
    if (tMulai[2] === tAkhir[2]) return tMulai[1] === tAkhir[1] ? tMulai[0] + ' s.d. ' + tAkhir.join(' ') : tMulai[0] + ' ' + tMulai[1] + ' s.d. ' + tAkhir.join(' ');
    return tMulai.join(' ') + ' s.d. ' + tAkhir.join(' ');
}

const getOrang = id => {
    let orang = id.charAt(0) === 'm' ? mitra.find(a => a.id == id.substr(1)) : pegawaiByNip[id.replace(/[#]/g, '')];
    if (orang) return {
        jabatan: 'Mitra BPS',
        nip: '-',
        golongan: '-',
        pangkat: '-',
        ...orang
    };
    return {
        nama: '.........',
        jabatan: '',
        nip: ''
    };
}

const pelaksanaToString = (pelaksana, dkk = true) => {
    pelaksana = pelaksana.split(',');
    return getOrang(pelaksana[0]).nama + (dkk && pelaksana[1] ? ', dkk' : '');
}

function Nip(xxx) {
    this.nip = xxx;
}
const nip = xxx => new Nip(xxx);
nip.fn = Nip.prototype = {
    print: function() {
        return this.nip.substr(0, 8) + ' ' + this.nip.substr(8, 6) + ' ' + this.nip.substr(14, 1) + ' ' + this.nip.substr(15, 3);
    },
}



/*
------------------------------------------------------------------------
COMPONENTS BUILDER
------------------------------------------------------------------------
*/

const selectpickerPegawai = ({
    name = 'pegawai',
    selected,
    title = 'Pilih pegawai...'
}) => `
	<select class="selectpicker" name="${name}" data-width="100%" data-live-search="true" title="${title}" data-style="btn-light btn-sm" ${name.includes('[]')?`multiple`:''}>
		${ pegawai.map((a,i) => `<option value="${a.nipbps}" ${selected===i||(selected||'').toString().includes(a.nipbps)?'selected':''}>${a.nama}</option>`).join('') }
	</select>
`;

const selectpickerPegawaiDanMitra = ({
    name = 'pelaksana',
    selected,
    title = 'Pilih pelaksana...',
    disabled = false
}) => `
	<select class="selectpicker" name="${name}" data-width="100%" data-live-search="true" title="${title}" data-style="btn-light btn-sm"${name.includes('[]')? ' multiple' : ''}${disabled? ' disabled' : ''}>
		${ pegawai.map((a,i) => `<option value="${a.nipbps}" ${(selected||'').toString().includes(a.nipbps)?'selected':''}>${a.nama}</option>`).join('') }
		${ mitra.length && '<optgroup label="Mitra">'+mitra.map((a,i) => `<option value="m${a.id}" data-subtext="${a.asal}" ${(selected||'').toString().includes('m'+a.id)?'selected':''}>${a.nama}</option>`).join('')+'</optgroup>' }
	</select>
`;

const selectpickerJenisKegiatan = (jenis = null) => SATKER.substr(2) === '00' ?
    `
	<select name="jenis" class="selectpicker" data-width="100%" title="Pilih jenis kegiatan..." data-style="btn-light btn-sm">
		<option value="1" ${jenis==1?'selected':''}>Kegiatan TU</option>
		<option value="2" ${jenis==2?'selected':''}>Kegiatan Bidang Statistik Sosial</option>
		<option value="3" ${jenis==3?'selected':''}>Kegiatan Bidang Statistik Produksi</option>
		<option value="4" ${jenis==4?'selected':''}>Kegiatan Bidang Statistik Distribusi</option>
		<option value="5" ${jenis==5?'selected':''}>Kegiatan Bidang NWAS</option>
		<option value="6" ${jenis==6?'selected':''}>Kegiatan Bidang IPDS</option>
		<option value="0" ${jenis==0?'selected':''}>Kegiatan Lainnya</option>
	</select>
` : `
	<select name="jenis" class="selectpicker" data-width="100%" title="Pilih jenis kegiatan..." data-style="btn-light btn-sm">
		<option value="1" ${jenis==1?'selected':''}>Kegiatan TU</option>
		<option value="2" ${jenis==2?'selected':''}>Kegiatan Seksi Statistik Sosial</option>
		<option value="3" ${jenis==3?'selected':''}>Kegiatan Seksi Statistik Produksi</option>
		<option value="4" ${jenis==4?'selected':''}>Kegiatan Seksi Statistik Distribusi</option>
		<option value="5" ${jenis==5?'selected':''}>Kegiatan Seksi NWAS</option>
		<option value="6" ${jenis==6?'selected':''}>Kegiatan Seksi IPDS</option>
		<option value="0" ${jenis==0?'selected':''}>Kegiatan Lainnya</option>
	</select>
`;

const selectpickerSeksi = (seksi = null) => SATKER.substr(2) === '00' ?
    `
	<select name="seksi" class="selectpicker" data-width="100%" title="Pilih bidang..." data-style="btn-light btn-sm">
		<option value="1" ${seksi==1?'selected':''}>Bagian TU</option>
		<option value="2" ${seksi==2?'selected':''}>Bidang Statistik Sosial</option>
		<option value="3" ${seksi==3?'selected':''}>Bidang Statistik Produksi</option>
		<option value="4" ${seksi==4?'selected':''}>Bidang Statistik Distribusi</option>
		<option value="5" ${seksi==5?'selected':''}>Bidang NWAS</option>
		<option value="6" ${seksi==6?'selected':''}>Bidang IPDS</option>
		<option value="0" ${seksi==0?'selected':''}>Lainnya</option>
	</select>
` : `
	<select name="seksi" class="selectpicker" data-width="100%" title="Pilih seksi..." data-style="btn-light btn-sm">
		<option value="1" ${seksi==1?'selected':''}>Sub-Bagian TU</option>
		<option value="2" ${seksi==2?'selected':''}>Seksi Statistik Sosial</option>
		<option value="3" ${seksi==3?'selected':''}>Seksi Statistik Produksi</option>
		<option value="4" ${seksi==4?'selected':''}>Seksi Statistik Distribusi</option>
		<option value="5" ${seksi==5?'selected':''}>Seksi NWAS</option>
		<option value="6" ${seksi==6?'selected':''}>Seksi IPDS</option>
		<option value="0" ${seksi==0?'selected':''}>Lainnya</option>
	</select>
`;



/*
------------------------------------------------------------------------
SETTING
------------------------------------------------------------------------
*/

const modalEditSetting = () => {
    modal({
        title: 'Pengaturan',
        body: `
			<div class="form-view">
				<div class="row">
					<div class="col-3 mb-2-3 mt-1">Penomoran Surat</div>
					<div class="col-9 mb-2-3"><select name="sistem" class="selectpicker" data-width="100%" data-style="btn-light btn-sm"><option value="0">Sistem 1 &nbsp;(ST, ST PWS, SPD)</option><option value="1" ${setting.sistem==1?'selected':''}>Sistem 2 &nbsp;(ST, SPD)</option><option value="2" ${setting.sistem==2?'selected':''}>Sistem 3 &nbsp;(Custom)</option></select></div>
					<div class="col-3 mb-2-3 mt-1">${SATKER.substr(2)==='00'? 'Provinsi' : 'Kabupaten/Kota'}</div>
					<div class="col-9 mb-2-3"><input type="text" name="nama_bps" class="form-control form-control-sm" value="${setting.nama_bps||''}" maxlength="45"></div>
					<div class="col-3 mb-2-3 mt-1">Kepala BPS</div>
					<div class="col-9 mb-2-3">${selectpickerPegawai({ name: 'kepala', selected: setting.kepala||'', title: 'Pilih kepala BPS...' })}</div>
					<div class="col-3 mb-2-3 mt-1">PPK</div>
					<div class="col-9 mb-2-3">${selectpickerPegawai({ name: 'ppk', selected: setting.ppk||'', title: 'Pilih PPK...' })}</div>
					<div class="col-3 mb-2-3 mt-1">Alamat</div>
					<div class="col-9 mb-2-3"><input type="text" name="alamat" class="form-control form-control-sm" value="${setting.alamat||''}" maxlength="45"></div>
					<div class="col-3 mb-2-3 mt-1">Alamat TTD</div>
					<div class="col-9 mb-2-3"><input type="text" name="alamat_ttd" class="form-control form-control-sm" value="${setting.alamat_ttd||''}" maxlength="30"></div>
					<div class="col-3 mb-2-3 mt-1">Footer Surat<div class="text-success fw-400 fz-13">(Opsional)</div></div>
					<div class="col-9 mb-2-3"><textarea name="footer_surat" class="form-control form-control-sm" rows="4">${setting.footer_surat||''}</textarea></div>
					<div class="col-12 px-0"><hr class="mt-1"></div>
					<div class="col-3 mb-2-3 mt-1">Server</div>
					<div class="col-9 mb-2-3"><input type="text" name="server" placeholder="Default" class="form-control form-control-sm" value="${setting.server||''}" maxlength="64"></div>
					<div class="col-9 offset-3 fz-12 mt--2"><a class="text-warning" href="bantuan#pengaturan-server" target="_blank"><i>Baca panduan sebelum mengedit server</i></a></div>
				</div>
			</div>
		`,
        primaryBtn: 'submit-setting-btn btn-secondary',
        primaryBtnLabel: 'Simpan Perubahan',
    });
}

const modalUploadTemplate = () => {
    modal({
        title: 'Ubah Template Dokumen',
        body: `
			<form id="form-upload-template" action="api/upload-template" method="post" enctype="multipart/form-data">
				<div class="bg-lightgray fz-13 p-3 mt--3" style="margin-left: -15px; margin-right: -15px;">
					Download template default terlebih dahulu<br>→ modifikasi → upload</i>
				</div>
				<div class="pt-4">
					<select class="selectpicker" name="type" data-width="100%" title="Tipe Dokumen" data-style="btn-light btn-sm" required>
						<option value="st">Surat Tugas</option>
						<option value="st-spd">Surat Tugas dengan SPD</option>
						<option value="kwitansi">Kwitansi</option>
						<option value="kwitansi-riil">Kwitansi dengan Pengeluaran Riil</option>
					</select>
				</div>
				<div class="pt-4">
					<input type="file" name="template" accept=".doc,.docx">
				</div>
				<div class="pt-1-2 fz-11 text-warning">(Maksimal 3 MB)</div>
			</form>
		`,
        primaryBtn: 'submit-upload-template-btn btn-secondary',
        primaryBtnLabel: 'Upload',
        modalDialog: 'modal-sm',
    });
}

const modalDeleteTemplate = (type) => {
    modal({
        title: 'Hapus Template Dokumen',
        body: 'Apakah Anda yakin akan mengembalikan template dokumen ke pengaturan default?',
        primaryBtn: 'submit-delete-template-btn btn-danger',
        primaryBtnLabel: 'Ya',
        modalDialog: 'modal-sm',
        data: {
            type
        },
    });
}

$(() => {

    $modal
        .on('click', '.submit-setting-btn', () => {
            let data = {
                sistem: $('#modal [name="sistem"]').val(),
                nama_bps: $('#modal [name="nama_bps"]').val(),
                kepala: $('#modal [name="kepala"]').val(),
                ppk: $('#modal [name="ppk"]').val(),
                alamat: $('#modal [name="alamat"]').val(),
                alamat_ttd: $('#modal [name="alamat_ttd"]').val(),
                footer_surat: $('#modal [name="footer_surat"]').val(),
                server: $('#modal [name="server"]').val(),
            }
            $.ajax({
                type: 'POST',
                data,
                url: 'api/save-setting',
                success: res => {
                    console.info('Response from api/save-setting', res);
                    if (res.success) {
                        delete res.success;
                        setting = res;
                        notif('Pengaturan berhasil diperbarui', 'success', 1);
                        announce('pengaturan');
                        refresh();
                    } else notif('Terjadi kesalahan', 'danger', 1);
                },
                error: e => {
                    console.warn(e.status, e.statusText);
                    if (window.location.hostname === 'localhost') console.error(e.responseText);
                    notif('Terjadi kesalahan', 'danger', 1);
                }
            });
            $modal.modal('hide');
            notif('Menyimpan pengaturan...', 'wait');
        })
        .on('click', '.submit-upload-template-btn', () => {
            let ok = 1;
            $modal.find('[name]').each((i, form) => {
                let $form = $(form),
                    name = $form.attr('name'),
                    val = $form.val();
                console.log({
                    name,
                    val
                });
                if (val) $form.parent().removeClass('has-error');
                else {
                    $form.parent().addClass('has-error');
                    ok = 0;
                }
            });
            if (ok) {
                $('#form-upload-template').submit();
                $modal.modal('hide');
                notif('Menyimpan pengaturan...', 'wait');
            }
        })
        .on('click', '.submit-delete-template-btn', () => {
            $.ajax({
                type: 'POST',
                data: {
                    type: $modal.data('type')
                },
                url: 'api/delete-template',
                success: res => {
                    location.reload();
                },
                error: e => {
                    location.reload();
                }
            });
            $modal.modal('hide');
            notif('Menghapus template dokumen...', 'wait');
        });

});

const $setting = $('#setting');

const updateSetting = () => {
    glob = {
        kab: setting.nama_bps,
        alamat: setting.alamat,
        footer: setting.footer_surat,
        tempat: setting.alamat_ttd,
        kpl: {
            nama: pegawaiByNip[setting.kepala] ? pegawaiByNip[setting.kepala].nama : '.....',
            nip: pegawaiByNip[setting.kepala] ? pegawaiByNip[setting.kepala].nip : '.....',
        },
        ppk: {
            nama: pegawaiByNip[setting.ppk] ? pegawaiByNip[setting.ppk].nama : '.....',
            nip: pegawaiByNip[setting.ppk] ? pegawaiByNip[setting.ppk].nip : '.....',
        },
        server: setting.server,
    }
    setting.sistem = parseInt(setting.sistem);
    if (setting.sistem) {
        $('#panel-tugas, #panel-tugas-pengawasan, #panel-perjalanan-dinas').removeClass('col-xl-4');
        $('body').addClass('without-st-pws');
    } else {
        $('#panel-tugas, #panel-tugas-pengawasan, #panel-perjalanan-dinas').addClass('col-xl-4');
        $('body').removeClass('without-st-pws');
    }
    $setting.html(`
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Penomoran Surat <a href="bantuan#penomoran-surat" title="Sistem penomoran ST/SPD"><sup>[?]</sup></a></div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${['Sistem 1  (ST, ST PWS, SPD)','Sistem 2  (ST, SPD)','Sistem 3  (Custom)'][setting.sistem]}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">${SATKER.substr(2)==='00'? 'Provinsi' : 'Kabupaten/Kota'}</div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.kab}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Kepala BPS</div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.kpl.nama}  /  ${glob.kpl.nip}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">PPK</div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.ppk.nama}  /  ${glob.ppk.nip}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Alamat</div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.alamat}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Alamat TTD</div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.tempat}"></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Footer Surat</div>
		<div class="col-7 col-sm-9 col-xl-10"><textarea class="form-control form-control-sm mb-2" rows="3" readonly>${glob.footer}</textarea></div>
		<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 text-right fw-600 mt-1">Server <a href="bantuan#pengaturan-server" title="Server untuk generate surat"><sup>[?]</sup></a></div>
		<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="${glob.server||'Default'}"></div>
	`);
}

if (template) {
    $('#setting-template').html(`
		<div class="fz-11 fw-600">Surat Tugas:</div>
		<a href="${template['st'].replace('app/docs/', 'assets/docs/')}">
			<i class="${template['st'].startsWith('app/docs/')? 'far' : 'fas'} fa-file-word mr-1"></i>
			<span ${template['st'].startsWith('app/docs/')? '' : 'class="fw-600"'}>
				${template['st'].replace('app/docs/', 'assets/docs/').replace('assets/docs/', '').replace('custom/', '')}
			</span>
		</a>
		${template['st'].startsWith('app/docs/') ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'st\')"><i class="fas fa-trash mr-1"></i>Hapus</button>'}
		<div class="fz-11 fw-600 pt-3">Surat Tugas dengan SPD:</div>
		<a href="${template['st-spd'].replace('app/docs/', 'assets/docs/')}">
			<i class="${template['st-spd'].startsWith('app/docs/')? 'far' : 'fas'} fa-file-word mr-1"></i>
			<span ${template['st-spd'].startsWith('app/docs/')? '' : 'class="fw-600"'}>
				${template['st-spd'].replace('app/docs/', 'assets/docs/').replace('assets/docs/', '').replace('custom/', '')}
			</span>
		</a>
		${template['st-spd'].startsWith('app/docs/') ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'st-spd\')"><i class="fas fa-trash mr-1"></i>Hapus</button>'}
		<hr style="margin-left: -20px; margin-right: -20px;">
		<div class="fz-11 fw-600">Kwitansi:</div>
		<a href="${template['kwitansi'].replace('app/docs/', 'assets/docs/')}">
			<i class="${template['kwitansi'].startsWith('app/docs/')? 'far' : 'fas'} fa-file-word mr-1"></i>
			<span ${template['kwitansi'].startsWith('app/docs/')? '' : 'class="fw-600"'}>
				${template['kwitansi'].replace('app/docs/', 'assets/docs/').replace('assets/docs/', '').replace('custom/', '')}
			</span>
		</a>
		${template['kwitansi'].startsWith('app/docs/') ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'kwitansi\')"><i class="fas fa-trash mr-1"></i>Hapus</button>'}
		<div class="fz-11 fw-600 pt-3">Kwitansi dengan Pengeluaran Riil:</div>
		<a href="${template['kwitansi-riil'].replace('app/docs/', 'assets/docs/')}">
			<i class="${template['kwitansi-riil'].startsWith('app/docs/')? 'far' : 'fas'} fa-file-word mr-1"></i>
			<span ${template['kwitansi-riil'].startsWith('app/docs/')? '' : 'class="fw-600"'}>
				${template['kwitansi-riil'].replace('app/docs/', 'assets/docs/').replace('assets/docs/', '').replace('custom/', '')}
			</span>
		</a>
		${template['kwitansi-riil'].startsWith('app/docs/') ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'kwitansi-riil\')"><i class="fas fa-trash mr-1"></i>Hapus</button>'}
	`);
}



/*
------------------------------------------------------------------------
ALL PAGES
------------------------------------------------------------------------
*/

const refresh = () => {
    if (urlPath('')) renderGantt({
        pegawai,
        surat,
        libur,
        tglGantt,
        ganttItems
    });
    else ganttNotRendered = true;
    $(() => {
        suratTable.clear().rows.add(surat.filter(a => moment(a.tgl_mulai).isSameOrAfter(tglGantt[0], 'day')).reverse()).draw();
    });
    autoc = {
        kec: [...new Set(mitra.map(a => a.kec))],
        tjn: [...new Set(surat.map(a => a.tujuan))],
        tmp: [...new Set(surat.map(a => a.tempat))],
    }
    updateSetting();
    updateDaftarTugas();
    generateCalendar();
}

const refreshPegawai = () => {
    pegawaiTable.clear().rows.add(pegawai).draw();
    pegawaiByNip = pegawai.reduce((obj, {
        nipbps,
        nip: a,
        ...rest
    }) => (obj[nipbps] = {
        nip: nip(a).print(),
        ...rest
    }, obj), {});
    mitraTable.clear().rows.add(mitra).draw();
    refresh();
}

$(() => {

    $('#nav-user-avatar').attr('src', 'https://community.bps.go.id/images/avatar/' + ME.urlfoto);
    $('#nav-user-name').html(ME.nama).attr('title', ME.nama);
    $('#nav-user-email').html(ME.username + '@bps.go.id').attr('title', ME.username + '@bps.go.id');

    $('.scrollbar-inner').scrollbar();

    $('#akun-saya-container-1 [name="nama"]').val(ME.nama);
    $('#akun-saya-container-1 [name="username"]').val(ME.username);
    $('#akun-saya-container-1 [name="peran"]').val(['', 'Top Manager', 'Developer', 'Supervisor', 'Administrator', 'Editor', 'Viewer'][LV]);
    $('#akun-saya-container-2 [name="nip"]').val(ME.nip || '-');
    $('#akun-saya-container-2 [name="nipbps"]').val(/^bps\d{4}$/.test(NIP) ? '-' : NIP);
    $('#akun-saya-container-2 [name="email"]').val(ME.username + '@bps.go.id');
    $('#akun-saya-container-2 [name="jabatan"]').val(ME.jabatan || '-');
    $('#akun-saya-container-2 [name="golongan"]').val(ME.golongan || '-');
    $('#akun-saya-container-2 [name="pangkat"]').val(ME.pangkat || '-');

    if (LV > 5) {
        $('.buat-st-btn').hide();
        $('.buat-pws-btn').hide();
    }

});