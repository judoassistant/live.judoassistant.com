export function eventTypeFilter(type) {
  switch (type) {
    case 'IPPON':
      return 'Ippon';
    case 'WAZARI':
      return 'Wazari';
    case 'SHIDO':
      return 'Shido';
    case 'HANSOKU_MAKE':
      return 'Hansoku Make';
    case 'IPPON_OSAEKOMI':
      return 'Ippon (Osaekomi)';
    case 'WAZARI_OSAEKOMI':
      return 'Wazari (Osaekomi)';
    case 'CANCEL_IPPON':
      return 'Ippon Cancelled';
    case 'CANCEL_WAZARI':
      return 'Wazari Cancelled';
    case 'CANCEL_SHIDO':
      return 'Shido Cancelled';
    case 'CANCEL_HANSOKU_MAKE':
      return 'Hansoku-Make Cancelled';
    default:
      return '';
  }
}

export function rankFilter(rank) {
  switch (rank) {
    case "KYU_6":
      return "6th kyu";
    case "KYU_5":
      return "5th kyu";
    case "KYU_4":
      return "4th kyu";
    case "KYU_3":
      return "3rd kyu";
    case "KYU_2":
      return "2nd kyu";
    case "KYU_1":
      return "1st kyu";
    case "DAN_1":
      return "1st dan";
    case "DAN_2":
      return "2nd dan";
    case "DAN_3":
      return "3rd dan";
    case "DAN_4":
      return "4th dan";
    case "DAN_5":
      return "5th dan";
    case "DAN_6":
      return "6th dan";
    case "DAN_7":
      return "7th dan";
    case "DAN_8":
      return "8th dan";
    case "DAN_9":
      return "9th dan";
    case "DAN_10":
      return "10th dan";
    default:
      return "";
  }
}

export function countryFilter(country) {
  switch (country) {
    case "DENMARK":
      return "Denmark";
    case "FRANCE":
      return "France";
    default:
      return "";
  }
}

export function sexFilter(sex) {
  switch (sex) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    default:
      return "";
  }
}

export function blockTypeFilter(type) {
  switch(type) {
    case "ELIMINATION":
      return "Elimination";
    case "FINAL":
      return "Finals";
    default:
      return "";
  }
}

export function blockStatusFilter(status) {
  switch(status) {
    case "NOT_STARTED":
      return "Not Started";
    case "STARTED":
      return "In Progress";
    case "FINISHED":
      return "Finished";
    default:
      return "";
  }
}

export function dateFilter(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

