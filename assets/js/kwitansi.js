$(() => {

    $modal
        .on('click', '.open-modal-kwitansi-btn', function() {
            let {
                id,
                no,
                tgl,
                pws,
                pelaksana,
                anggota,
                tempat,
                tgl_mulai,
                tgl_akhir
            } = $modal.data(),
                bendahara = (pegawai.find(a => a.jabatan.includes('endahara')) || {}).nipbps,
                hari = moment(tgl_akhir).diff(moment(tgl_mulai), 'days') + 1;
            modal({
                title: 'Kwitansi SPD <span class="text-primary">No.&nbsp;' + getNomorSurat(no, tgl, pws == 1 ? 'pws' : null) + '</span>',
                body: `
			<div class="form-edit">
				<div class="row">
					<div class="col-sm-4 mt-sm-1 fw-600 text-sm-right pr-0">Pelaksana</div>
					<div class="col-sm-8">${selectpickerPegawaiDanMitra({ name: 'pelaksana[]', selected: [pelaksana, ...anggota], title: 'Pilih pelaksana...' })}</div>
					<div class="w-100 mb-1"></div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tempat Asal</div>
					<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tempat_asal" value="${setting.alamat_ttd}" maxlength="120"></div>
					<div class="w-100 mb-1"></div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tempat Tujuan</div>
					<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tempat_tujuan" value="${tempat}" readonly></div>
					<div class="w-100 mb-1"></div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Lamanya Perjalanan</div>
					<div class="col-sm-8">
						<div class="input-group input-group-sm">
							<input type="text" class="form-control form-control-sm" name="hari" value="${hari}" readonly>
							<div class="input-group-append"><span class="input-group-text bg-light"><div class="px-1">hari</div></span></div>
						</div>
					</div>
					<div class="w-100"><hr></div>

					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Uang Harian</div>
					<div class="col-7 col-sm-5 pr-2-3">
						<div class="input-group input-group-sm">
							<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>
							<input type="text" class="form-control form-control-sm text-right uang" name="uang_harian" value="150000" maxlength="12">
						</div>
					</div>
					<div class="col-5 col-sm-3 pl-0 mb-1">
						<div class="d-flex align-items-center">
							<i class="fas fa-times fz-12 mr-2-3"></i>
							<div><input class="form-control form-control-sm text-center" type="number" name="uang_harian_n" value="${hari}" min="0" max="1000"></div>
						</div>
					</div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Biaya Transportasi</div>
					<div class="col-7 col-sm-5 pr-2-3">
						<div class="input-group input-group-sm">
							<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>
							<input type="text" class="form-control form-control-sm text-right uang" name="uang_transportasi" placeholder="0" maxlength="12">
						</div>
					</div>
					<div class="col-5 col-sm-3 pl-0 mb-1">
						<div class="d-flex align-items-center">
							<i class="fas fa-times fz-12 mr-2-3"></i>
							<div><input class="form-control form-control-sm text-center" type="number" name="uang_transportasi_n" value="2" min="0" max="1000"></div>
						</div>
					</div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Biaya Penginapan</div>
					<div class="col-7 col-sm-5 pr-2-3">
						<div class="input-group input-group-sm">
							<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>
							<input type="text" class="form-control form-control-sm text-right uang" name="uang_penginapan" placeholder="0" maxlength="12">
						</div>
					</div>
					<div class="col-5 col-sm-3 pl-0">
						<div class="d-flex align-items-center">
							<i class="fas fa-times fz-12 mr-2-3"></i>
							<div><input class="form-control form-control-sm text-center" type="number" name="uang_penginapan_n" value="${hari-1}" min="0" max="1000"></div>
						</div>
					</div>

					<div class="col-12 mt-3 mb-1 text-center fz-12">Pengeluaran Riil<div class="text-gray">(yang tidak dapat diperoleh bukti-bukti pengeluarannya)</div></div>
					<div class="col-sm-7 pr-sm-0 mb-1 mb-sm-0"><input name="uraian_riil1" type="text" class="form-control form-control-sm" placeholder="Uraian pengeluaran riil #1"></div>
					<div class="col-sm-5 pr-2-3">
						<div class="input-group input-group-sm">
							<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">Rp</div></span></div>
							<input type="text" class="form-control form-control-sm text-right uang" name="uang_riil1" placeholder="0" maxlength="12">
						</div>
					</div>
					<div class="col-sm-7 pr-sm-0 mb-1 mb-sm-0 mt-3 mt-sm-1"><input name="uraian_riil2" type="text" class="form-control form-control-sm" placeholder="Uraian pengeluaran riil #2"></div>
					<div class="col-sm-5 pr-2-3 mt-sm-1">
						<div class="input-group input-group-sm">
							<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">Rp</div></span></div>
							<input type="text" class="form-control form-control-sm text-right uang" name="uang_riil2" placeholder="0" maxlength="12">
						</div>
					</div>

					<div class="w-100"><hr></div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Bendahara</div>
					<div class="col-sm-8">${selectpickerPegawaiDanMitra({ name: 'bendahara', selected: bendahara, title: 'Pilih bendahara pengeluaran...' })}</div>
					<div class="w-100 mb-1"></div>
					<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tanggal Dibayarkan</div>
					<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tgl_bayar" value="${moment().format(f1)}"></div>
				</div>
			</div>
			`,
                primaryBtn: 'submit-kwitansi-btn btn-secondary',
                primaryBtnLabel: '<i class="fas fa-download fz-16 mr-2"></i>Download',
                secondaryBtn: 'd-none',
                misc: `<button type="button" class="btn btn-default" onclick="modalViewSurat({id:'${id}'})"><i class="fas fa-arrow-left fz-16 mr-sm-2"></i><span class="d-none d-sm-inline">Kembali</span></button>`,
                data: {
                    'show.bs.modal': () => {
                        $('#modal [name="tgl_bayar"]').datepicker();
                        $('#modal .uang').toArray().forEach(function(field) {
                            new Cleave(field, {
                                numeral: true,
                                numericOnly: true,
                                numeralDecimalScale: 0,
                                numeralDecimalMark: ',',
                                delimiter: '.'
                            });
                        });
                    },
                },
            }).trigger('show.bs.modal');
        })
        .on('click', '.submit-kwitansi-btn', function() {

            let {
                no,
                tgl,
                pws,
                tujuan
            } = $modal.data(),
                spd_no = getNomorSurat(no, tgl, pws == 1 ? 'pws' : null),
                spd_tgl = moment(tgl).format(f2),
                tempat_asal = $('#modal [name="tempat_asal"]').val(),
                tempat_tujuan = $('#modal [name="tempat_tujuan"]').val(),
                hari = $('#modal [name="hari"]').val(),

                u_harian = numeral($('#modal [name="uang_harian"]').val())._value,
                u_harian_n = Number($('#modal [name="uang_harian_n"]').val()),
                u_transport = numeral($('#modal [name="uang_transportasi"]').val())._value,
                u_transport_n = Number($('#modal [name="uang_transportasi_n"]').val()),
                u_penginapan = numeral($('#modal [name="uang_penginapan"]').val())._value,
                u_penginapan_n = Number($('#modal [name="uang_penginapan_n"]').val()),
                u_riil1 = numeral($('#modal [name="uang_riil1"]').val())._value,
                u_riil2 = numeral($('#modal [name="uang_riil2"]').val())._value,
                uraian_riil1 = $('#modal [name="uraian_riil1"]').val(),
                uraian_riil2 = $('#modal [name="uraian_riil2"]').val(),

                tgl_bayar = moment($('#modal [name="tgl_bayar"]').val(), f1).format(f2),
                bendahara = getOrang($('#modal [name="bendahara"]').val());

            let u_t1 = u_harian * u_harian_n,
                u_t2 = u_transport * u_transport_n,
                u_t3 = u_penginapan * u_penginapan_n,
                u_t4 = u_riil1 + u_riil2,
                u_t = u_t1 + u_t2 + u_t3 + u_t4,
                u_t4_terbilang = terbilang(u_t4),
                u_t_terbilang = terbilang(u_t);

            let data = {
                glob: {

                    ...glob,

                    tujuan,
                    tempat_tujuan,
                    tempat_asal,
                    hari,
                    spd_no,
                    spd_tgl,

                    u_harian,
                    u_harian_n,
                    u_transport,
                    u_transport_n,
                    u_penginapan,
                    u_penginapan_n,
                    u_riil1,
                    u_riil2,
                    uraian_riil1,
                    uraian_riil2,

                    u_t1,
                    u_t2,
                    u_t3,
                    u_t4,
                    u_t,
                    u_t4_terbilang,
                    u_t_terbilang,

                    tgl_bayar,
                    bendahara: {
                        nama: bendahara.nama,
                        nip: bendahara.nip
                    },

                },
                data: $('#modal [name="pelaksana[]"]').val().map(a => {
                    let {
                        nama,
                        nip,
                        jabatan,
                        golongan,
                        pangkat
                    } = getOrang(a);
                    return {
                        nama,
                        nip,
                        golongan
                    };
                }),
            }

            $modal.modal('hide');
            postAndDownload('api/generate-kwitansi', data);

        });

});