import { v1 } from '@datadog/datadog-api-client';
import { EventCreateRequest } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v1/models/EventCreateRequest';

const configuration = v1.createConfiguration();
const apiInstance = new v1.AuthenticationApi(configuration);
const event = new v1.EventsApi(configuration);

export const auth = () => apiInstance.validate().then((data: any) => console.log(data));

export const postEvent = async (body: EventCreateRequest) => {
  try {
    const eventRes = await event.createEvent({body});
    console.log(`post event status: [${eventRes.status}]`);
  } catch (error) {
    console.log(error)
  }
}