import axios from 'axios';
import messages from '../../constants/messages.json';
import { axiosInstance } from './AxiosInstance';

export class AxiosHttpClient {

  axiosInstance;

  constructor(instance) {
    this.axiosInstance = instance;
  }

  async get(path, header) {

    try
    {
      const response = await this.axiosInstance.get(path, header);
      return response.data;
    }
    catch (err)
    {
      throw this.generateHttpError(err);
    }
  }

  async post(path, body, header) {

    try
    {
      const response = await this.axiosInstance.post(path, body, header);
      return response.data;
    }
    catch (err)
    {
      throw this.generateHttpError(err);
    }
  }

  generateHttpError(error) {

    if (axios.isAxiosError(error)) {

      if (error.response) return {
        statusCode: error.response.status,
        message: messages.pt.requestError
      };

      else if (error.request) return {
        statusCode: null,
        message: messages.pt.requestWithoutResponseError
      };
    }

    return {
      statusCode: null,
      message: error.message
    };
  }

}

export default new AxiosHttpClient(axiosInstance);