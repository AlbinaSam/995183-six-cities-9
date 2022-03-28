import request from 'axios';
import { HTTP_CODE } from '../consts';
import {toast} from 'react-toastify';

export const errorHandler = (error: unknown): void => {

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.error(response.data.error);
        break;

      case HTTP_CODE.NOT_FOUND:
        toast.info(response.data.error);
        break;

      case HTTP_CODE.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
    }
  }
};
