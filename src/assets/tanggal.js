import { id } from 'date-fns/locale';

// Custom Indonesian localization
const idLocale = {
  ...id,
  localize: {
    ...id.localize,
    month: (monthIndex) => {
      const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ];
      return months[monthIndex];
    },
    day: (dayIndex) => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return days[dayIndex];
    },
    // You can add more methods for other date-related elements if needed
  },
};

export default idLocale;
