const JENIS = SATKER.substr(2) === '00' ? ['Lainnya', 'Bagian Tata Usaha', 'Bidang Statistik Sosial', 'Bidang Statistik Produksi', 'Bidang Statistik Distribusi', 'Bidang NWAS', 'Bidang IPDS'] : ['Lainnya', 'Subbagian Tata Usaha', 'Seksi Statistik Sosial', 'Seksi Statistik Produksi', 'Seksi Statistik Distribusi', 'Seksi NWAS', 'Seksi IPDS'];
const ANGKUTAN = ['', 'Kendaraan Dinas', 'Kendaraan Pribadi', 'Angkutan Umum'];
const COLOR = ['#343a40', '#ffe180', '#f9bad6', '#d2ea95', '#ccc', '#fcd29a', '#b6d5fc'];

const f0 = 'YYYY-MM-DD';
const f1 = 'DD/MM/YYYY';
const f2 = 'D MMMM YYYY';

var suratTable,
    suratCalendar;

const ganttBar = (jenis, spd = true) => ['bg-dark text-white', 'ganttYellow', 'ganttRed', 'ganttGreen', 'ganttGray', 'ganttOrange', 'ganttBlue'][jenis] + (spd ? ' has-flag' : '')

const ganttColor = jenis => ['text-dark', 'ganttYellow-text', 'ganttRed-text', 'ganttGreen-text', 'ganttGray-text', 'ganttOrange-text', 'ganttBlue-text'][jenis]

const sortNo = ({
    no: b
}, {
    no: a
}) => {
    let firstInt = parseInt(a, 10);
    let secondInt = parseInt(b, 10);
    if (firstInt != secondInt) return firstInt - secondInt;
    else return 1000 * a.charCodeAt(a.length - 2) + a.charCodeAt(a.length - 1) - 1000 * b.charCodeAt(b.length - 2) + b.charCodeAt(b.length - 1);
}

const sortNoSpd = ({
    no_spd: b = 0
}, {
    no_spd: a = 0
}) => {
    let firstInt = parseInt(a, 10);
    let secondInt = parseInt(b, 10);
    if (firstInt != secondInt) return firstInt - secondInt;
    else return 1000 * a.charCodeAt(a.length - 2) + a.charCodeAt(a.length - 1) - 1000 * b.charCodeAt(b.length - 2) + b.charCodeAt(b.length - 1);
}

const sortTgl = ({
    tgl: a
}, {
    tgl: b
}) => moment(a, f0).isBefore(moment(b, f0), 'day') ? 1 : (moment(a, f0).isAfter(moment(b, f0), 'day') ? -1 : 0);

const getSurat = (jenis = null, tgl = null) => {
    let s;
    if (jenis === 'spd') s = surat.filter(a => a.no_spd != null && a.no_spd != '-').sort(sortNoSpd).sort(sortTgl);
    else if (jenis === 'pws') s = surat.filter(a => a.pws === '1').sort(sortNo).sort(sortTgl);
    else s = surat.filter(a => a.pws === '0' || a.pws == null).sort(sortNo).sort(sortTgl);
    return tgl ? s.filter(a => a.tgl === tgl) : s;
}

const generateNomorSurat = (jenis, tgl = null) => {
    let surat = tgl ? getSurat(jenis).find(a => moment(a.tgl, f0).isSameOrBefore(moment(tgl, f0), 'day')) : getSurat(jenis)[0];
    return surat ? parseInt(jenis === 'spd' ? surat.no_spd : surat.no, 10) + 1 : '';
}

const allowEditSurat = (jenis, pembuat) => LV < 6 && (jenis == 0 || jenis == ME.seksi || pembuat == NIP || LV < 5)



/*
------------------------------------------------------------------------
GANTT
------------------------------------------------------------------------
*/

const $gantt = $('#gantt');
var $ganttTopRow;

var tglGantt = [moment().subtract(40, 'days').toDate(), moment().add(30, 'days').toDate()],
    ganttNotRendered = false,
    ganttItems = 999;

function ganttSticky() {
    let y = $(window).scrollTop() - $gantt.offset().top + 14;
    $ganttTopRow && $ganttTopRow.css('top', (y > 0 ? y : 0) + 'px');
}

$(() => {
    window.addEventListener('scroll', e => {
        ganttSticky()
    });
});

const renderGantt = ({
    pegawai,
    surat,
    libur,
    tglGantt,
    ganttItems = 999
}) => {
    $gantt.gantt({
        source: pegawai.map(a => mapPegawaiSurat(a, surat, tglGantt[0])),
        holidays: libur,
        navigate: 'scroll',
        scale: 'days',
        maxScale: 'days',
        minScale: 'days',
        months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        dow: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
        waitText: 'Mohon tunggu...',
        scrollToToday: false,
        itemsPerPage: ganttItems,
        dateStart: tglGantt[0] ? moment(tglGantt[0]).toDate() : moment().subtract(1, 'months').toDate(),
        dateEnd: tglGantt[1] ? moment(tglGantt[1]).toDate() : moment().add(1, 'months').toDate(),
        onItemClick: (data) => {
            console.log(data);
            modalViewSurat(data);
        },
        onAddClick: (dt, rowId) => {
            console.log(dt, rowId);
            let date = dt ? moment.unix(dt / 1000) : moment();
            if (rowId) {
                if (LV < 6) {
                    if (LV > 4) {
                        if (date.isBefore(PREVWEEK, 'day')) return notif('Pembuatan surat tugas sebelum minggu lalu hanya dapat dilakukan oleh <span class="fw-600">Administrator</span>', 'danger', 0, {
                            delay: 1000
                        });
                        else if (date.isAfter(moment(NEXTMONTH, f1), 'day')) return notif('Pembuatan surat tugas di atas sebulan yang akan datang hanya dapat dilakukan oleh <span class="fw-600">Administrator</span>', 'danger', 0, {
                            delay: 1000
                        });
                    }
                    modalEditSurat({
                        pelaksana: rowId,
                        tgl: date.format(f1)
                    });
                }
            } else modalRekap(date);
        },
        popover: ({
            no,
            no_spd,
            pws,
            tgl,
            tujuan,
            tempat,
            tgl_mulai,
            tgl_akhir
        }) => ({
            title: no === '-' ? '' : getNomorSurat(no, tgl, pws == 1 ? 'pws' : null) + (no_spd != null && no_spd != '-' ? '<div class="d-inline-block mx-1">·</div>' + getNomorSurat(no_spd, tgl, 'spd') : ''),
            content: popoverBar({
                tujuan,
                tempat,
                tgl_mulai,
                tgl_akhir
            }),
            trigger: 'hover',
            placement: () => matchMedia('(min-width: 576px)').matches ? 'auto' : 'top',
            html: true,
        }),
        onRender: (core, element) => {
            var $rightPanel = $(element).find(".rightPanel");
            var $dataPanel = $rightPanel.find(".dataPanel");
            var rightPanelWidth = $rightPanel.width();
            var dataPanelWidth = $dataPanel.width();
            var shift = function() {
                core.repositionLabel(element)
            };
            if (!element.scrollNavigation.canScroll || !$dataPanel.find(".today").length) {
                return false
            }
            var max_left = (dataPanelWidth - rightPanelWidth) * -1;
            var cur_marg = $dataPanel.css("margin-left").replace("px", "");
            var val = $dataPanel.find(".today").offset().left - $dataPanel.offset().left;
            val -= 24 * 7 - 1;
            val *= -1;
            if (val > 0) val = 0;
            else if (val < max_left) val = max_left;
            $dataPanel.animate({
                "margin-left": val + "px"
            }, "fast", shift);
            element.scrollNavigation.panelMargin = val;
            setTimeout(core.synchronizeScroller, 200, element);
            ganttNotRendered = false;
            $ganttTopRow = $('#gantt .dataPanel > .row, #gantt .leftPanel > .row.spacer');
        }
    });
}

const mapPegawaiSurat = ({
    nipbps,
    nip,
    username,
    nama,
    urlfoto
}, surat, dateStart) => ({
    id: nipbps,
    name: surat.find(({
        tgl_mulai,
        tgl_akhir,
        pelaksana,
        no_spd
    }) => IS_WEEKEND || pelaksana.includes(nipbps) && moment().isBetween(tgl_mulai, tgl_akhir, 'day', '[]') && no_spd) ? '<i class="fa-fw fas fa-fingerprint text-lightgray"></i>' : '<i class="fa-fw fas fa-fingerprint text-success"></i>',
    desc: nama,
    values: surat
        .filter(({
            pelaksana
        }) => pelaksana.includes(nipbps))
        .map(({
            no_spd,
            pws,
            tgl_mulai,
            tgl_akhir,
            jenis,
            ...rest
        }) => ({
            from: moment(tgl_mulai).isBefore(dateStart, 'day') ? moment(dateStart).subtract(1, 'days').format() : moment(tgl_mulai).format(),
            to: moment(tgl_akhir).format(),
            dataObj: {
                no_spd,
                pws,
                tgl_mulai,
                tgl_akhir,
                jenis,
                ...rest
            },
            customClass: ganttBar(jenis, no_spd),
            label: pws === '1' ? '<i class="fas fa-user-tie"></i>' : '',
        }))
});

const popoverBar = ({
    tujuan,
    tempat,
    tgl_mulai,
    tgl_akhir
}) => `
	<div class="font-weight-bold">${tujuan}</div>
	<div>di ${tempat}</div>
	<div class="text-muted mt-2"><i class="far fa-calendar-alt mr-2"></i>${getWaktu(tgl_mulai, tgl_akhir)}</div>
`;



/*
------------------------------------------------------------------------
TANGGAL
------------------------------------------------------------------------
*/

const modalEditTanggal = () => {
    modal({
        title: 'Atur Rentang Waktu',
        body: `<div class="text-muted mb-3">Atur rentang waktu tugas & perjalanan dinas yang akan ditampilakan:</div><div class="input-daterange input-group input-group-sm" id="datepicker"><input type="text" class="input-sm form-control" name="start" value="${moment(tglGantt[0]).format(f1)}"><div class="input-group-prepend"><span class="input-group-text">sampai</span></div><input type="text" class="input-sm form-control" name="end" value="${moment(tglGantt[1]).format(f1)}"></div>`,
        modalDialog: 'modal-sm',
        primaryBtn: 'submit-tgl-btn',
        primaryBtnLabel: 'Simpan',
        data: {
            'shown.bs.modal': () => {
                $('#modal .input-daterange').datepicker({
                    endDate: moment().add(2, 'months').format(f1)
                });
                $('#modal input[name=start]').focus();
            }
        }
    });
}

const modalEditTanggalProcessData = () => {
    return {
        mulai: moment($modal.find('[name="start"]').val(), f1).format(f0),
        akhir: moment($modal.find('[name="end"]').val(), f1).format(f0),
    };
}

const submitTanggal = data => {
    $.ajax({
        type: 'POST',
        data,
        url: 'api/get-surat',
        success: res => {
            console.info('Response from api/get-surat', res);
            if (Array.isArray(res)) {
                surat = res;
                tglGantt = [moment(data.mulai).toDate(), moment(data.akhir).toDate()];
                notif('Rentang waktu telah diperbarui', 'success', 1);
                refresh();
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Memperbarui rentang waktu...', 'wait');
}

const modalRekap = tgl_x => {
    let tugas_tgl_x = surat.filter(({
        pelaksana,
        tgl_mulai,
        tgl_akhir
    }) => moment(tgl_x).isBetween(tgl_mulai, tgl_akhir, 'day', '[]') && !pelaksana.split(',').every(a => a.includes('m')));
    let tgl_x_prev = moment(tgl_x).subtract(1, 'days'),
        tgl_x_next = moment(tgl_x).add(1, 'days');
    modal({
        title: tgl_x.format('dddd, D MMMM YYYY'),
        body: tugas_tgl_x.length ? tugas_tgl_x.map(({
            pelaksana,
            no_spd,
            tempat
        }) => {
            let anggota = [];
            anggota = pelaksana.split(',').map(a => getOrang(a));
            pelaksana = anggota.shift();
            return `
				<div class="d-flex">
					<div class="avatar-group justify-content-end avatar-group-custom" style="min-width:84px">
						${getAva(pelaksana)}
						${anggota.length===1? getAva(anggota[0]) : (anggota.length>1? `<div class="avatar" title="${anggota.map(a => a.nama).join(',<br>')}" data-toggle="tooltip" data-trigger="hover" data-placement="right" data-html="true"><span class="avatar-title rounded-circle border border-white bg-gray fz-15">+${anggota.length}</span></div>` : '')}
					</div>
					<div class="w-100 ml-3 pt-1 text-truncate"><div class="fz-11 text-truncate">${pelaksana.nama + (anggota.length? ', dkk' : '')}</div><div class="text-gray text-truncate"><i class="fas fa-map-marker-alt mr-2"></i>${tempat}</div></div>
				</div>
			`
        }).join('<div class="pb-2"></div>') : '<div class="text-center py-3"><i class="fas fa-ban fa-5x text-lightgray"></i><div class="mt-3 text-gray">Tidak ada tugas</div></div>',
        primaryBtn: 'd-none',
        secondaryBtn: 'd-none',
        misc: `
			<button type="button" class="btn btn-primary mr-2" onclick="modalRekap(moment('${tgl_x_prev.format(f0)}'))" ${moment(tgl_x_prev).isBefore(tglGantt[0], 'day')? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
			<button type="button" class="btn btn-primary mr-2" onclick="modalRekap(moment('${tgl_x_next.format(f0)}'))" ${moment(tgl_x_next).isAfter(tglGantt[1], 'day')? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
		`,
        data: {
            'shown.bs.modal': () => {
                $('[data-toggle="tooltip"]').tooltip()
            }
        },
    });
}

const getAva = ({
    urlfoto,
    nama
}, tooltip = false) => urlfoto ? `<div class="avatar" title="${nama}" ${tooltip? 'data-toggle="tooltip" data-trigger="hover" data-placement="right"' : ''}><img src="https://community.bps.go.id/images/avatar/${urlfoto}" class="avatar-img rounded-circle opos-top border border-white"></div>` : `<div class="avatar"><span class="avatar-title rounded-circle border border-white bg-secondary">${(nama||' ').charAt(0)}</span></div>`;



/*
------------------------------------------------------------------------
SURAT
------------------------------------------------------------------------
*/

const modalViewSurat = ({
    id,
    no = '',
    no_spd = '',
    pws,
    tgl,
    ttd,
    pelaksana,
    tujuan = '',
    tempat = '',
    angkutan = '',
    tgl_mulai,
    tgl_akhir,
    jenis,
    dibuat_oleh,
    terakhir_update
}) => {
    if (id && !no) {
        modalViewSurat(surat.find(a => a.id == id));
        return false;
    }
    let anggota = [];
    anggota = pelaksana.split(',');
    pelaksana = anggota.shift();
    modal({
        title: 'Surat Tugas',
        body: `
			<div class="form-view">
				<div class="row mb-2-3">
					<div class="col-3">Nomor</div>
					<div class="col-9">${getNomorSurat(no, tgl, pws==1? 'pws' : null)}</div>
					<div class="col-9 offset-3">${no_spd!=null&&no_spd!='-'? `<div class="d-inline-block mr-3">${getNomorSurat(no_spd, tgl, 'spd')}</div>${allowEditSurat(jenis, dibuat_oleh)? '<a href="javascript:void(0)" class="open-modal-kwitansi-btn d-inline-block text-success"><i class="fas fa-file-alt" style="margin-right:6px"></i>Kwitansi</a>' : ''}` : ''}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Tanggal</div>
					<div class="col-9">${moment(tgl).format('D MMMM YYYY (dddd)')}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">TTD${ttd!==setting.kepala && ttd.endsWith('#')? '<span class="fw-400 ml-1 text-gray">(Plh.)</span>' : ''}</div>
					<div class="col-9">${getOrang(ttd).nama}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Pelaksana</div>
					<div class="col-9">${getOrang(pelaksana).nama}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Anggota</div>
					<div class="col-9">${anggota.length? anggota.map(a => getOrang(a).nama).join('<br>') : '-'}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Tujuan</div>
					<div class="col-9">${tujuan}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Tempat</div>
					<div class="col-9">${tempat}</div>
				</div>
				<div class="row mb-2-3" ${no_spd? '' : 'style="display:none"'}>
					<div class="col-3">Angkutan</div>
					<div class="col-9">${ANGKUTAN[angkutan]}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Waktu</div>
					<div class="col-9">${getWaktu(tgl_mulai, tgl_akhir)}</div>
				</div>
				<div class="row mb-2-3">
					<div class="col-3">Jenis</div>
					<div class="col-9">Kegiatan ${JENIS[jenis]}</div>
				</div>
				<div class="row">
					<div class="col-3">Dibuat Oleh</div>
					<div class="col-9">${getOrang(dibuat_oleh).nama}</div>
				</div>
			</div>
		`,
        primaryBtn: 'd-none',
        secondaryBtn: 'd-none',
        misc: `
			${allowEditSurat(jenis, dibuat_oleh)? `<button type="button" class="btn btn-danger hapus-surat-tugas-btn mr-2" ${LV>4 && moment(tgl_mulai).isBefore(PREVWEEK, 'day')? 'disabled' : ''}><i class="fas fa-trash-alt d-sm-none fz-16"></i><span class="d-none d-sm-inline">Hapus</span></button>` : ''}
			${allowEditSurat(jenis, dibuat_oleh)? `<button type="button" class="btn btn-primary edit-surat-tugas-btn mr-2" ${LV>4 && moment(tgl_mulai).isBefore(PREVWEEK, 'day')? 'disabled' : ''}><i class="fas fa-pen d-sm-none fz-16"></i><span class="d-none d-sm-inline">Edit</span></button>` : ''}
			<button type="button" class="btn btn-secondary download-surat-word-btn"><i class="fas fa-download fz-16 mr-sm-2"></i><span class="d-none d-sm-inline">Download</span></button>
		`,
        data: {
            id,
            no,
            no_spd,
            pws,
            tgl,
            ttd,
            pelaksana,
            anggota,
            tujuan,
            tempat,
            angkutan,
            tgl_mulai,
            tgl_akhir,
            jenis,
            dibuat_oleh,
            terakhir_update
        },
    });
}

const modalEditSurat = ({
    id,
    no = '',
    no_spd = '',
    pws,
    tgl,
    ttd,
    pelaksana,
    anggota = [],
    tujuan = '',
    tempat = '',
    angkutan = '',
    tgl_mulai,
    tgl_akhir,
    jenis,
    dibuat_oleh,
    terakhir_update
}) => {
    let title, primaryBtn, primaryBtnLabel,
        form = '';
    if (terakhir_update) {
        form = `<input type="hidden" name="id" value="${id}">`;
        tgl = moment(tgl).format(f1);
        tgl_mulai = moment(tgl_mulai).format(f1);
        tgl_akhir = moment(tgl_akhir).format(f1);
        title = 'Edit Surat Tugas';
        primaryBtn = 'submit-surat-tugas-btn btn-secondary';
        primaryBtnLabel = 'Simpan Perubahan';
    } else {
        tgl_mulai = tgl || TODAY;
        tgl_akhir = tgl || TODAY;
        tgl = moment(tgl, f1).isBefore(moment(), 'day') ? tgl : TODAY;
        title = 'Buat Surat Tugas';
        primaryBtn = 'submit-surat-tugas-btn';
        primaryBtnLabel = 'Simpan';
    }
    if (setting.sistem) pws = 0;
    modal({
        title,
        primaryBtn,
        primaryBtnLabel,
        body: `
			<div class="form-edit">
				${setting.sistem===2?
					`<div class="row mb-1-2">
						${form}
						<div class="col-2 mt-1">Nomor</div>
						<div class="col-5 pr-0">
							<div class="input-group input-group-sm">
								<input data-req="1" type="text" class="form-control" name="no" value="${no}" maxlength="30" placeholder="No. ST">
							</div>
						</div>
						<div class="col-5"></div>
					</div>
					<div class="row mb-1-2">
						<div class="col-5 pr-0 offset-2">
							<div class="input-group input-group-sm">
								<input type="text" class="form-control" name="no_spd" value="${no_spd||''}" maxlength="30" placeholder="No. SPD" ${no_spd?'':'disabled'}>
							</div>
						</div>
						<div class="col-5">
							<div class="custom-control custom-switch mt-1">
								<input type="checkbox" class="custom-control-input toggle-no-spd" id="custom-switch-spd" ${no_spd?'checked':''}>
								<label class="custom-control-label d-block cur-p" for="custom-switch-spd">Perjalanan Dinas</label>
							</div>
						</div>
					</div>` :
					`<div class="row mb-1-2">
						${form}
						<div class="col-2 mt-1">Nomor</div>
						<div class="col-4">
							<div class="input-group input-group-sm">
								<input data-req="1" type="text" class="form-control" name="no" value="${no}" maxlength="5" placeholder="No. ST">
								<div class="input-group-append">
									<button class="btn btn-light border-gray get-no-st-btn" type="button" title="Buat nomor otomatis" ${ttd?'disabled':''}><i class="fas fa-sync"></i></button>
								</div>
							</div>
						</div>
						<div class="col-6 pl-2">
							<div class="custom-control custom-switch mt-1 without-st-pws-hidden">
								<input type="checkbox" class="custom-control-input toggle-pws" id="custom-switch-pws" name="pws" ${pws==1?'checked':''}>
								<label class="custom-control-label d-block cur-p" for="custom-switch-pws">Pengawasan</label>
							</div>
						</div>
					</div>
					<div class="row mb-1-2">
						<div class="col-4 offset-2">
							<div class="input-group input-group-sm">
								<input type="text" class="form-control" name="no_spd" value="${no_spd||''}" maxlength="5" placeholder="No. SPD" ${no_spd?'':'disabled'}>
								<div class="input-group-append">
									<button class="btn btn-light border-gray get-no-spd-btn" type="button" title="Buat nomor otomatis" ${no_spd&&!ttd?'':'disabled'}><i class="fas fa-sync"></i></button>
								</div>
							</div>
						</div>
						<div class="col-6 pl-2">
							<div class="custom-control custom-switch mt-1">
								<input type="checkbox" class="custom-control-input toggle-no-spd" id="custom-switch-spd" ${no_spd?'checked':''}>
								<label class="custom-control-label d-block cur-p" for="custom-switch-spd">Perjalanan Dinas</label>
							</div>
						</div>
					</div>`
				}
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Tanggal</div>
					<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm" name="tgl" value="${tgl}"></div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">TTD</div>
					<div class="col-10">
						<div class="row">
							<div class="col">${selectpickerPegawai({ name: 'ttd', selected: ttd? ttd.replace(/[*#]/g,'') : 0 })}</div>
							<div class="col-auto pl-0 position-relative" id="ttd-setting-container" style="display:none">
								<div class="position-absolute text-center" style="pointer-events: none; left: 8px; top: 7px; width: 22px; height: 22px; z-index: 2"><i class="fas fa-cog fz-16"></i></div>
								<select id="ttd-setting" class="selectpicker" data-selected-text-format="static" title="" data-width="fit" data-style="btn-light btn-sm transparent-caret" data-dropdown-align-right="true">
									<option value="1" data-subtext="(Atas Nama)">A.n</option>
									<option value="2"${(ttd||'').endsWith('#')? ' selected' : ''} data-subtext="(Pelaksana Harian)">Plh.</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Pelaksana</div>
					<div class="col-10">${selectpickerPegawaiDanMitra({ selected: pelaksana })}</div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Anggota</div>
					<div class="col-10">${selectpickerPegawaiDanMitra({ name: 'anggota[]', selected: anggota, title: 'Pilih anggota...' })}</div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Tujuan</div>
					<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm placeholder-italic" name="tujuan" value="${tujuan}" maxlength="120" placeholder="Contoh: Pencacahan Susenas Maret 2021"></div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Tempat</div>
					<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm" name="tempat" value="${tempat}" maxlength="120"></div>
				</div>
				<div class="row mb-1-2 form-angkutan" ${no_spd? '' : 'style="display:none"'}>
					<div class="col-2 mt-1">Angkutan</div>
					<div class="col-10">
						<select name="angkutan" class="selectpicker" data-width="100%" title="Pilih jenis angkutan yang digunakan..." data-style="btn-light btn-sm">
							<option value="1" ${angkutan==1?'selected':''} selected>Kendaraan Dinas</option>
							<option value="2" ${angkutan==2?'selected':''}>Kendaraan Pribadi</option>
							<option value="3" ${angkutan==3?'selected':''}>Angkutan Umum</option>
						</select>
					</div>
				</div>
				<div class="row mb-1-2">
					<div class="col-2 mt-1">Waktu</div>
					<div class="col-10"><div class="input-daterange input-group input-group-sm" id="datepicker"><input data-req="1" type="text" class="input-sm form-control" name="tgl_mulai" value="${tgl_mulai}"><div class="input-group-prepend"><span class="input-group-text">sampai</span></div><input data-req="1" type="text" class="input-sm form-control" name="tgl_akhir" value="${tgl_akhir}"></div></div>
				</div>
				<div class="row">
					<div class="col-2 mt-1">Jenis</div>
					<div class="col-10">${selectpickerJenisKegiatan(jenis)}</div>
				</div>
			</div>
		`,
        data: {
            'shown.bs.modal': () => {
                $('#modal .toggle-pws').change(function() {
                    $('#modal [name="no"]').val('')
                });
                $('#modal .toggle-no-spd').change(function() {
                    let unchecked = !$(this).is(':checked');
                    $('#modal [name="no_spd"], #modal .get-no-spd-btn').prop('disabled', unchecked);
                    $('#modal .form-angkutan').slideToggle(unchecked);
                    if (unchecked) $('#modal [name="no_spd"]').val('');
                });
                $('#modal [name="tgl"]').datepicker(LV > 4 ? {
                    startDate: PREVWEEK.format(f1),
                    endDate: moment(tglGantt[1]).format(f1)
                } : {
                    endDate: moment(tglGantt[1]).format(f1)
                });
                $('#modal .input-daterange').datepicker(LV > 4 ? {
                    startDate: PREVWEEK.format(f1)
                } : {
                    endDate: moment().add(2, 'months').format(f1)
                });
                $('#modal [name="tujuan"]').autocomplete({
                    source: autoc.tjn
                });
                $('#modal [name="tempat"]').autocomplete({
                    source: autoc.tmp
                });
                $('#modal [name="ttd"]').change(function() {
                    $('#ttd-setting-container').toggle($(this).val() !== setting.kepala)
                }).change();
            },
            'show.bs.modal': () => {
                if (terakhir_update && LV > 4) {
                    if (moment(tgl_akhir, f1).isAfter(moment(NEXTMONTH, f1), 'day')) $('#modal [name="tgl_akhir"]').datepicker('update', '');
                    if (moment(tgl_mulai, f1).isAfter(moment(NEXTMONTH, f1), 'day')) $('#modal [name="tgl_mulai"]').datepicker('update', '');
                }
            },
        },
    });
    return $modal;
}

const modalEditSuratProcessData = () => {
    let ok = 1,
        data = {};
    $modal.find('[name]').each((i, form) => {
        let $form = $(form),
            name = $form.attr('name'),
            val = $form.val();
        if (name === 'pws') {
            data['pws'] = $form.is(':checked') ? 1 : 0
        } else if (((data[name] = val) == '' && $form.data('req')) || (name === 'no_spd' && val === '' && !$form.attr('disabled')) || (name === 'pelaksana' && !val) || (name === 'tgl_akhir' && data['tgl_mulai'] === '')) {
            $form.closest('[class^="col-"]').addClass('has-error');
            ok = 0;
        } else $form.closest('[class^="col-"]').removeClass('has-error');
    });
    if (moment(data.tgl_mulai, f1).isBefore(moment(data.tgl, f1), 'day')) {
        $('#modal [name="tgl"]').closest('[class^="col-"]').addClass('has-error');
        ok = 0;
    }
    if (ok) {
        if (!$('#custom-switch-spd').is(':checked')) data.angkutan = null;
        data.tgl = moment(data.tgl, f1).format(f0);
        data.tgl_mulai = moment(data.tgl_mulai, f1).format(f0);
        data.tgl_akhir = moment(data.tgl_akhir, f1).format(f0);
        if (data.ttd !== setting.kepala) {
            if ($('#ttd-setting').val() === '2') data.ttd += '#';
        }
        return data;
    }
    return false;
}

const modalDeleteSurat = ({
    id,
    no,
    no_spd,
    pws,
    tgl
}) => {
    modal({
        data: {
            id
        },
        title: 'Hapus Surat Tugas',
        body: `Apakah Anda yakin akan menghapus <span class="text-primary fw-600">${getNomorSurat(no, tgl, pws==1? 'pws' : null) + (no_spd!=null&&no_spd!='-'? '</span> & <span class="text-primary fw-600">'+getNomorSurat(no_spd, tgl, 'spd') : '')}</span>?`,
        primaryBtn: 'btn-danger hapus-surat-tugas-ok-btn',
        primaryBtnLabel: 'Ya',
        modalDialog: 'modal-sm',
    });
}

const submitSurat = data => {
    $.ajax({
        type: 'POST',
        data,
        url: 'api/save-surat',
        success: res => {
            console.info('Response from api/save-surat', res);
            if (res.success) {
                delete res.success;
                if (data.id) {
                    surat[surat.findIndex(a => a.id === res.id)] = res;
                    notif('Surat tugas berhasil diperbarui', 'success', 1);
                    announce('surat tugas');
                } else {
                    surat.push(res);
                    notif('Surat tugas berhasil dibuat', 'success', 1);
                    announce('surat tugas');
                }
                refresh();
            } else if (res.fail && Array.isArray(res.data)) {
                let {
                    tujuan,
                    tgl_mulai,
                    tgl_akhir
                } = res.data[0];
                notif(`<span class="fw-600">${getOrang(res.conflict).nama}</span> tidak dapat diberi tugas karena ada ${tujuan} pada <span class="fw-600">${getWaktu(tgl_mulai, tgl_akhir)}</span>`, 'danger', 1);
            } else if (res.fail && res.exist) {
                let {
                    no,
                    pws,
                    tgl
                } = res.exist;
                notif(`Nomor surat <span class="fw-600">${getNomorSurat(no, tgl, pws==1? 'pws' : null)}</span> sudah terpakai`, 'danger', 1);
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Memproses surat tugas...', 'wait');
}

const deleteSurat = data => {
    $.ajax({
        type: 'POST',
        data: {
            id: data.id
        },
        url: 'api/delete-surat',
        success: res => {
            console.info('Response from api/delete-surat', res);
            if (res.success) {
                surat.splice(surat.findIndex(a => a.id === res.id), 1);
                notif('Surat tugas berhasil dihapus', 'success', 1);
                announce('surat tugas');
                refresh();
            } else notif('Terjadi kesalahan', 'danger', 1);
        },
        error: e => {
            console.warn(e.status, e.statusText);
            if (window.location.hostname === 'localhost') console.error(e.responseText);
            notif('Terjadi kesalahan', 'danger', 1);
        }
    });
    notif('Menghapus surat tugas...', 'wait');
}

const downloadSelectedSurat = () => {
    let suratFiltered = surat.filter(a => moment(a.tgl_mulai).isSameOrAfter(tglGantt[0], 'day')).reverse(),
        data = {
            glob,
            data: suratTable.rows({
                selected: true
            })[0].map(a => prepareDataToPost(suratFiltered[a]))
        };
    console.info(data);
    postAndDownload(setting.server || 'api/generate-surat', data);
}

const exportSurat = () => {
    notif('Mengekspor ke Excel...', 'wait', false, {
        delay: 500
    });
    const getAnggota = (a) => {
        let [pelaksana, ...anggota] = a.split(',');
        return anggota.length ? anggota.map(b => '- ' + getOrang(b).nama).join(' \n') : '';
    }
    let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet([
            ['Tanggal Surat', 'TTD', 'No. ST', 'No. SPD', 'Pelaksana', 'Anggota', 'Pelaksana - NIP', 'Pelaksana - Jabatan', 'Pelaksana - Golongan & Pangkat', 'Tujuan', 'Tempat', 'Angkutan', 'Waktu', 'Waktu Mulai', 'Waktu Berakhir', 'Subject Matter', 'Dibuat/Diupdate Oleh'],
            ...surat.reverse().map(({
                no = '',
                no_spd = '',
                pws,
                tgl,
                ttd,
                pelaksana,
                tujuan = '',
                tempat = '',
                angkutan = '',
                tgl_mulai,
                tgl_akhir,
                jenis,
                dibuat_oleh,
                terakhir_update
            }) => {
                let {
                    nip,
                    jabatan,
                    golongan = '-',
                    pangkat = '-'
                } = getOrang(pelaksana.split(',')[0]);
                return [
                    moment(tgl).format(f2),
                    getOrang(ttd).nama,
                    getNomorSurat(no, tgl, pws == 1 ? 'pws' : null),
                    no_spd == null || no_spd === '-' ? '-' : getNomorSurat(no_spd, tgl, 'spd'),
                    pelaksanaToString(pelaksana, 0),
                    getAnggota(pelaksana),
                    nip,
                    jabatan,
                    golongan + '  /  ' + pangkat,
                    tujuan,
                    tempat,
                    ANGKUTAN[angkutan],
                    getWaktu(tgl_mulai, tgl_akhir),
                    getWaktu(tgl_mulai),
                    getWaktu(tgl_akhir),
                    JENIS[jenis],
                    getOrang(dibuat_oleh).nama,
                ]
            })
        ]);
    XLSX.utils.book_append_sheet(wb, ws, 'BagiTugas ' + SATKER);
    XLSX.writeFile(wb, 'BagiTugas ' + moment().format('YYYYMMDD-HHmm') + '.xlsx');
}



/*
------------------------------------------------------------------------
DAFTAR TUGAS
------------------------------------------------------------------------
*/

const $daftarTugas = {
    st: $('#daftar-st'),
    pws: $('#daftar-pws'),
    spd: $('#daftar-spd')
};
const $downloadBtn = $('#download-btn');

const updateDaftarTugas = () => {
    generateDaftarTugas(getSurat(), 'st');
    generateDaftarTugas(getSurat('pws'), 'pws');
    generateDaftarTugas(getSurat('spd'), 'spd');
}

const generateDaftarTugas = (arraySurat, jenis) => {
    let no = jenis === 'spd' ? 'no_spd' : 'no',
        html = '<div class="activity-feed activity-feed-custom">';
    arraySurat.forEach((a, i) => {
        html += generateTimeline({
            id: a.id,
            no: getNomorSurat(a[no], a.tgl, jenis),
            tgl: i && arraySurat[i - 1].tgl === a.tgl ? false : moment(a.tgl, f0).format('D MMM'),
            pelaksana: a.pelaksana,
            jenis: a.jenis
        }, i)
    });
    html += '</div></div></div>';
    $daftarTugas[jenis]
        .html(html);
}

const generateTimeline = ({
    id,
    no,
    tgl,
    pelaksana,
    jenis
}, notFirst) => {
    no = no === '-' ?
        `<a href="javascript:void(0)" onclick="modalViewSurat({id:${id}})"><div><i class="fas fa-file-alt mr-2 ${ganttColor(jenis)}"></i></div><div><div class="no d-none">${no}</div><div style="padding-top:2px">${pelaksanaToString(pelaksana)}</div></div></a>` :
        `<a href="javascript:void(0)" onclick="modalViewSurat({id:${id}})"><div><i class="fas fa-file-alt mr-2 ${ganttColor(jenis)}"></i></div><div><div class="no">${no}</div><div>${pelaksanaToString(pelaksana)}</div></div></a>`;
    return tgl ?
        `${notFirst? '</div></div><div class="w-100"></div>' : ''}<div>${tgl}</div><div class="feed-item"><div><div>${no}</div>` :
        `<div>${no}</div>`;
}



/*
------------------------------------------------------------------------
DOM
------------------------------------------------------------------------
*/

$(() => {

    $('.set-tgl-btn').click(() => {
        modalEditTanggal();
    });

    $modal
        .on('click', '.get-no-st-btn', function() {
            let pws = $('#modal [name="pws"]').is(':checked'),
                tgl = $('#modal [name="tgl"]').val();
            $('#modal [name="no"]').val(generateNomorSurat(pws ? 'pws' : 'st', tgl ? moment(tgl, f1).format(f0) : null));
        })
        .on('click', '.get-no-spd-btn', function() {
            let tgl = $('#modal [name="tgl"]').val();
            $('#modal [name="no_spd"]').val(generateNomorSurat('spd', tgl ? moment(tgl, f1).format(f0) : null));
        })
        .on('click', '.submit-tgl-btn', function() {
            let data = modalEditTanggalProcessData();
            if (data) {
                $modalBtn[0].prop('disabled', true).blur();
                $modal.modal('hide');
                submitTanggal(data);
            }
        })
        .on('click', '.edit-surat-tugas-btn', function() {
            modalEditSurat($modal.data()).trigger('show').trigger('shown');
        })
        .on('click', '.submit-surat-tugas-btn', function() {
            let data = modalEditSuratProcessData();
            if (data) {
                $modalBtn[0].prop('disabled', true).blur();
                $modal.modal('hide');
                submitSurat(data);
            }
        })
        .on('click', '.hapus-surat-tugas-btn', function() {
            modalDeleteSurat($modal.data());
        })
        .on('click', '.hapus-surat-tugas-ok-btn', function() {
            let data = $modal.data();
            $modalBtn[0].prop('disabled', true).blur();
            $modal.modal('hide');
            deleteSurat(data);
        })
        .on('click', '.download-surat-word-btn', function() {
            let data = {
                glob,
                data: [prepareDataToPost($modal.data())]
            };
            console.info(data);
            $modal.modal('hide');
            postAndDownload(setting.server || 'api/generate-surat', data);
        });

    $('.buat-st-btn').click(() => {
        modalEditSurat({
            pelaksana: '',
            no: generateNomorSurat('st')
        })
    });
    $('.buat-pws-btn').click(() => {
        modalEditSurat({
            pws: '1',
            pelaksana: '',
            no: generateNomorSurat('pws')
        })
    });

    suratTable = $('#table-surat').DataTable({
        data: [],
        rowId: 'id',
        order: [],
        pageLength: 50,
        select: true,
        language: {
            select: {
                rows: {
                    _: '<a href="javascript:void(0)" onclick="downloadSelectedSurat()">download %d surat yang terpilih</a>',
                    0: '',
                }
            },
        },
        columns: [{
            title: 'Tanggal',
            data: 'tgl',
            render: tgl => moment(tgl).format(f2)
        }, {
            title: 'PWS',
            data: 'pws',
            searchable: false,
            render: pws => pws == 1 ? '<div class="d-none">1</div><i class="fas fa-check"></i>' : '<div class="d-none">2</div><span class="text-muted">-</span>'
        }, {
            title: 'No. ST',
            data: null,
            render: ({
                no,
                tgl,
                pws
            }) => getNomorSurat(no, tgl, pws == 1 ? 'pws' : null)
        }, {
            title: 'No. SPD',
            data: null,
            render: ({
                no_spd,
                tgl
            }) => no_spd != null && no_spd != '-' ? getNomorSurat(no_spd, tgl, 'spd') : '<span class="text-muted">-</span>'
        }, {
            title: 'Subject Matter',
            data: 'jenis',
            render: jenis => JENIS[jenis]
        }, {
            title: 'Pelaksana',
            data: 'pelaksana',
            render: pelaksana => pelaksanaToString(pelaksana)
        }, {
            title: 'Tujuan',
            data: 'tujuan',
        }, {
            title: '',
            data: null,
            searchable: false,
            sortable: false,
            render: ({
                id
            }) => `<i class="fas fa-info-circle fa-fw py-1 cur-p fz-16 text-primary" title="Edit" onclick="modalViewSurat({id:${id}})"></i>`
        }],
    });

    $('#table-surat').on('draw.dt', function() {
        $('#table-surat th:nth-child(2), #table-surat td:nth-child(2)').addClass('without-st-pws-hidden')
    });

    suratTable.on('select deselect', function() {
        let n = suratTable.rows({
            selected: true
        })[0].length;
        if (n) $downloadBtn.html(`Download ${n} surat yang terpilih`).parent().show();
        else $downloadBtn.parent().hide();
    });

});



/*
------------------------------------------------------------------------
MY CALENDAR
------------------------------------------------------------------------
*/

const generateCalendar = () => {
    $(() => {
        suratCalendar = new Calendar('#calendar', {
            style: 'background',
            roundRangeLimits: true,
            minDate: moment().startOf('year').toDate(),
            maxDate: moment().endOf('year').toDate(),
            dataSource: surat
                .filter(({
                    pelaksana
                }) => pelaksana.includes(NIP))
                .map(({
                    id,
                    no,
                    no_spd,
                    pws,
                    tgl,
                    tujuan,
                    tempat,
                    tgl_mulai,
                    tgl_akhir,
                    jenis
                }) => ({
                    startDate: moment(tgl_mulai).toDate(),
                    endDate: moment(tgl_akhir).toDate(),
                    id,
                    no,
                    no_spd,
                    pws,
                    tgl,
                    tujuan,
                    tempat,
                    tgl_mulai,
                    tgl_akhir,
                    jenis,
                    color: COLOR[jenis],
                })),
            mouseOnDay: function({
                element,
                events
            }) {
                if (events.length) {
                    let {
                        id,
                        no,
                        no_spd,
                        pws,
                        tgl,
                        tujuan,
                        tempat,
                        tgl_mulai,
                        tgl_akhir,
                        jenis
                    } = events[0];
                    $(element).popover({
                        trigger: 'manual',
                        container: 'body',
                        placement: 'bottom',
                        html: true,
                        title: getNomorSurat(no, tgl, pws == 1 ? 'pws' : null) + (no_spd != null && no_spd != '-' ? '<div class="d-inline-block mx-1">·</div>' + getNomorSurat(no_spd, tgl, 'spd') : ''),
                        content: popoverBar({
                            tujuan,
                            tempat,
                            tgl_mulai,
                            tgl_akhir
                        }),
                    });
                    $(element).popover('show');
                }
            },
            mouseOutDay: function({
                element,
                events
            }) {
                if (events.length) {
                    $(element).popover('hide');
                }
            },
            clickDay: function({
                events
            }) {
                if (events.length) {
                    modalViewSurat({
                        id: events[0].id
                    });
                }
            },
            customDayRenderer: function(element, currentDate) {
                if (currentDate.getDay() === 0 || currentDate.getDay() === 6) element.classList.add('text-danger');
                if (libur.includes(moment(currentDate).format(f0))) element.classList.add('holiday');
                if (moment().isSame(currentDate, 'day')) element.classList.add('today');
            },
        });
    });
}



/*
------------------------------------------------------------------------
MISC
------------------------------------------------------------------------
*/

const postAndDownload = (url, data) => {
    $(`
		<form action="${url}" method="POST" target="_blank" class="d-none">
			<input type="text" name="data" id="data">
			<input type="submit">
		</form>
	`)
        .appendTo('body')
        .find('#data').val(JSON.stringify(data))
        .next().click()
        .closest('form').remove();
}

const prepareDataToPost = ({
    id,
    no,
    no_spd,
    pws,
    tgl,
    ttd,
    pelaksana,
    anggota,
    tujuan,
    tempat,
    angkutan,
    tgl_mulai,
    tgl_akhir,
    jenis,
    dibuat_oleh,
    terakhir_update
}) => {
    if (!anggota) {
        anggota = pelaksana.split(',');
        pelaksana = anggota.shift();
    }
    let {
        nama,
        nip,
        jabatan,
        golongan,
        pangkat
    } = getOrang(pelaksana);
    if (getOrang(ttd).nip === glob.kpl.nip) {
        ttd = {
            nama: getOrang(ttd).nama,
            NAMA: getOrang(ttd).nama.toUpperCase(),
            nip: getOrang(ttd).nip,
            tgl: moment(tgl).format('D MMMM YYYY'),
        }
    } else {
        ttd = ttd.endsWith('#') ? {
            nama: getOrang(ttd).nama,
            NAMA: getOrang(ttd).nama.toUpperCase(),
            nip: getOrang(ttd).nip,
            tgl: moment(tgl).format('D MMMM YYYY'),
            plh: 1,
        } : {
            nama: getOrang(ttd).nama,
            NAMA: getOrang(ttd).nama.toUpperCase(),
            nip: getOrang(ttd).nip,
            tgl: moment(tgl).format('D MMMM YYYY'),
            an: 1,
            jabatan: getOrang(ttd).jabatan
        }
    }
    return {
        no: getNomorSurat(no, tgl, pws == 1 ? 'pws' : null),
        nama,
        nip,
        jabatan,
        golongan,
        pangkat,
        anggota: anggota.map(a => getOrang(a).nama),
        tujuan,
        tempat,
        angkutan: ANGKUTAN[angkutan],
        tgl_mulai: moment(tgl_mulai).format(f2),
        tgl_akhir: moment(tgl_akhir).format(f2),
        waktu: getWaktu(tgl_mulai, tgl_akhir),
        ttd,
        spd: no_spd == null || no_spd == '-' ? undefined : {
            no: getNomorSurat(no_spd, tgl, 'spd'),
            tingkat_biaya: 'C',
            lama: moment(tgl_akhir).diff(moment(tgl_mulai), 'days') + 1 + ' hari',
        },
    }
}