import { request } from "./request";
import type { ICustomer, IProvider } from "types";
import { storage } from 'config/conn_firebase';

export const getProvider = async (providerId: string): Promise<IProvider> => {
  const prvUrl = `/providers/?id=${providerId}`;

  let provider: IProvider = {}

  await request<IProvider>({
    url: prvUrl,
  }).then(res => {
    if (res.length > 0) {
      const prv = res[0];
      provider = {
        id: prv.id,
        name: prv.name,
        location: prv.location,
        image_id: prv.image_id,
        known_for: prv.known_for,
        open_time: prv.open_time,
        close_time: prv.close_time,
        created_at: prv.created_at,
        food_categories: prv.food_categories,
        comments: prv.comments,
        ratings: prv.ratings,
        provider_order: prv.provider_order,
      };
      // provider.set(providerResult);
      // userType.set('Provider');
    }
  });
  return provider
}

export const getCustomer = async (customerId: string): Promise<ICustomer> => {
  const cstUrl = `/customers/?id=${customerId}`;

  let customer: ICustomer = {} 

  await request<ICustomer>({
    url: cstUrl,
  }).then(res => {
    if (res.length > 0) {
      const cst = res[0];
      customer = {
        id: cst.id,
        name: cst.name,
        email: cst.email,
        profile_image: cst.profile_image,
        customer_order: cst.customer_order,
        user_scan: cst.user_scan,
      } as ICustomer;
      // customer.set(customerResult);
      // userType.set('Customer');
    }
  });
  return customer 
}

export const handleUploadImage = async (file, name) => {
  const imageSizeMB = file.size / 1024 / 1024;

  if (imageSizeMB > 3) {
    return alert(
      ' File size can not be more than 3 MB. Please compress you image and upload again !'
    );
  }

  const image_name = file.name;
  const timestamp = String(Math.round(new Date().getTime() / 1000));
  const uploadTask = storage.ref(`${name}/${timestamp + image_name}`).put(file);
  let downloadableUrl: string = '';

  await uploadTask.on(
    'state_changed',
    snapshot => {},
    error => {
      console.log(error);
    },
    async () => {
      await storage
        .ref(name)
        .child(timestamp + image_name)
        .getDownloadURL()
        .then(url => {
          downloadableUrl = url;
          return url 
          console.log('downloadable url', url);
        });
    }
  );
  return downloadableUrl
};