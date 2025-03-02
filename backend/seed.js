const mongoose = require('mongoose');
const ErrorCode = require('./models/ErrorCode');

const errorCodes = [
    // Mitsubishi Heavy Industry - SRK-ZSX
    {
        code: 'E01',
        description: 'Daxili blok PCB rabitə xətası',
        model: 'Mitsubishi Heavy Industry - SRK-ZSX'
    },
    {
        code: 'E02',
        description: 'İç ünite sensör xətası',
        model: 'Mitsubishi Heavy Industry - SRK-ZSX'
    },
    {
        code: 'E03',
        description: 'Kompressor temperatur sensoru xətası',
        model: 'Mitsubishi Heavy Industry - SRK-ZSX'
    },

    // Mitsubishi Electric - MSZ-FH
    {
        code: 'E4',
        description: 'Temperatur sensoru açıq/qısa dövrə',
        model: 'Mitsubishi Electric - MSZ-FH'
    },
    {
        code: 'E5',
        description: 'Kompressor qoruma xətası',
        model: 'Mitsubishi Electric - MSZ-FH'
    },
    {
        code: 'E6',
        description: 'Yüksək təzyiq qoruması',
        model: 'Mitsubishi Electric - MSZ-FH'
    },

    // Daikin - FTXZ-N
    {
        code: 'A5',
        description: 'Donma qoruması / İstilik yığılması',
        model: 'Daikin - FTXZ-N'
    },
    {
        code: 'E7',
        description: 'Fan motoru xətası',
        model: 'Daikin - FTXZ-N'
    },
    {
        code: 'U4',
        description: 'Daxili/Xarici blok kommunikasiya xətası',
        model: 'Daikin - FTXZ-N'
    },

    // Samsung - AR9500T
    {
        code: 'E121',
        description: 'İç ünite kommunikasiya xətası',
        model: 'Samsung - AR9500T'
    },
    {
        code: 'E211',
        description: 'Yüksək təzyiq sensoru xətası',
        model: 'Samsung - AR9500T'
    },
    {
        code: 'E251',
        description: 'Kompressor başlatma xətası',
        model: 'Samsung - AR9500T'
    },

    // LG - DUALCOOL
    {
        code: 'CH01',
        description: 'İç ünite hava sensoru xətası',
        model: 'LG - DUALCOOL'
    },
    {
        code: 'CH02',
        description: 'İç ünite boru sensoru xətası',
        model: 'LG - DUALCOOL'
    },
    {
        code: 'CH06',
        description: 'İç/Dış ünite kommunikasiya problemi',
        model: 'LG - DUALCOOL'
    },

    // Toshiba - SHORAI
    {
        code: 'F01',
        description: 'İç ünite PCB xətası',
        model: 'Toshiba - SHORAI'
    },
    {
        code: 'F02',
        description: 'PFC dövrə xətası',
        model: 'Toshiba - SHORAI'
    },
    {
        code: 'F04',
        description: 'Kompressor boşalma temperaturu xətası',
        model: 'Toshiba - SHORAI'
    },

    // Gree - U-CROWN
    {
        code: 'H1',
        description: 'Kapasitor xətası',
        model: 'Gree - U-CROWN'
    },
    {
        code: 'H2',
        description: 'IPM modulu xətası',
        model: 'Gree - U-CROWN'
    },
    {
        code: 'H3',
        description: 'Kompressor aşırı yük qoruması',
        model: 'Gree - U-CROWN'
    },

    // Carrier - 42QHC
    {
        code: 'E1',
        description: 'Otaq temperaturu sensor xətası',
        model: 'Carrier - 42QHC'
    },
    {
        code: 'E2',
        description: 'EEPROM xətası',
        model: 'Carrier - 42QHC'
    },
    {
        code: 'E3',
        description: 'DC fan motoru xətası',
        model: 'Carrier - 42QHC'
    },

    // Panasonic - ETHEREA
    {
        code: 'H11',
        description: 'İç ünite kommunikasiya sistemi anormallığı',
        model: 'Panasonic - ETHEREA'
    },
    {
        code: 'H14',
        description: 'İç ünite hava giriş sensoru anormallığı',
        model: 'Panasonic - ETHEREA'
    },
    {
        code: 'H15',
        description: 'Kompressor temperatur sensoru xətası',
        model: 'Panasonic - ETHEREA'
    },

    // Bosch - Climate 5000
    {
        code: 'EC',
        description: 'Sızıntı aşkarlanması',
        model: 'Bosch - Climate 5000'
    },
    {
        code: 'EH',
        description: 'Elektrik istilik qoruması',
        model: 'Bosch - Climate 5000'
    },
    {
        code: 'EL',
        description: 'İç ünite PCB kommunikasiya xətası',
        model: 'Bosch - Climate 5000'
    }
];

mongoose.connect('mongodb://localhost:27017/klima_hata_kodlari', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB bağlantısı başarılı');
    
    try {
        // Önce mevcut verileri temizle
        await ErrorCode.deleteMany({});
        console.log('Mövcud məlumatlar silindi');

        // Yeni verileri ekle
        await ErrorCode.insertMany(errorCodes);
        console.log('Yeni məlumatlar əlavə edildi');

        mongoose.connection.close();
        console.log('MongoDB bağlantısı bağlandı');
    } catch (error) {
        console.error('Məlumat əlavə edilərkən xəta baş verdi:', error);
    }
}).catch((err) => {
    console.error('MongoDB bağlantı xətası:', err);
});