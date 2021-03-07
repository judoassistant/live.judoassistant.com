export function eventTypeFilter(ev) {
  if (ev.type == 'IPPON')
    return 'Ippon';
  if (ev.type == 'WAZARI')
    return 'Wazari';
  if (ev.type == 'SHIDO')
    return 'Shido';
  if (ev.type == 'HANSOKU_MAKE')
    return 'Hansoku Make';
  if (ev.type == 'IPPON_OSAEKOMI')
    return 'Ippon (Osaekomi)';
  if (ev.type == 'WAZARI_OSAEKOMI')
    return 'Wazari (Osaekomi)';
  if (ev.type == 'CANCEL_IPPON')
    return 'Cancel Ippon';
  if (ev.type == 'CANCEL_WAZARI')
    return 'Cancel Wazari';
  if (ev.type == 'CANCEL_SHIDO')
    return 'Cancel Shido';
  if (ev.type == 'CANCEL_HANSOKU_MAKE')
    return 'Cancel Hansoku-Make';
}

