import { InviteStatus, InviteStatusFE } from 'src/modules/user/enum/user.enum';

export const getUserFilterStatus = (status: string | string[]) => {
  if (typeof status === 'string') {
    if (status === InviteStatus.PENDING || status === InviteStatus.CONFIRMED) {
      return {
        inviteStatus: status,
        $or: [{ isDisabled: { $exists: false } }, { isDisabled: false }],
      };
    } else if (status === InviteStatusFE.DEACTIVATED) {
      return { isDisabled: true };
    }
  } else if (Array.isArray(status) && status.length > 0) {
    return {
      $or: status.map(getUserFilterStatus),
    };
  }

  return {};
};
