const prefix = '/api/bac-si/v1/';

export default {
  api: {
    user: {
      login: '/api/phat-thuoc/v1/auth/sso-login',
      // login: '/auth/oauth/token',
    },
    khoa: prefix + 'dm-khoa',
    phong: prefix + 'dm-phong',
    nguoiDung: prefix + 'dm-nguoi-dung',
    tuDien: prefix + 'dm-tu-dien',
    nbRaVien: prefix + 'statistics/nb-ra-vien',
    nbVaoVien: prefix + 'statistics/nb-vao-vien',
    professionalDocument: prefix + 'dm-tai-lieu-chuyen-mon',
    nguoiBenh: prefix + 'nb-dot-dieu-tri',
    mabenh: prefix + 'dm-ma-benh',
    loaibenh: prefix + 'dm-loai-benh',
    toDieuTri: prefix + 'nb-to-dieu-tri',
    dvXetNghiem: prefix + 'nb-dv-xet-nghiem',
    dvCdhaPttt: prefix + 'nb-dv-cdha-pttt',
    dvKho: prefix + 'nb-dv-kho',
    hsChamSoc: prefix + 'nb-ho-so-cham-soc',
    hoiChan: prefix + 'nb-hoi-chan',
  },
};
