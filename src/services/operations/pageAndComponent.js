import {toast} from "react-hot-toast"
import {apiConnector} from '../apiConnector'
import { catalogEndPoints } from '../apis';
const {CATALOGPAGEDATA_API} = catalogEndPoints;

export const getCatalogPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        //console.log(categoryId)
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, 
        {categoryId: categoryId});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

        result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

