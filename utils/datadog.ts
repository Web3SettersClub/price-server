import { v1 } from '@datadog/datadog-api-client';

const configuration = v1.createConfiguration();
const apiInstance = new v1.AuthenticationApi(configuration);

export const auth = () => apiInstance.validate().then((data: any) => console.log(data));