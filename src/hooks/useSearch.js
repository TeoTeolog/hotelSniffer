import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSearchArr } from "../redux/searchResult";

import { useHttp } from "../hooks/useHttp";
import useQueryFormater from "../hooks/useQueryFormater";
import useDateToJSON from "../hooks/useMyDate";

export function useSearch() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const { request } = useHttp();

  const { convertDateToJSON, nextDayAmount } = useDateToJSON();

  const { toQueryStringData } = useQueryFormater();

  const transformFormData = (formData) => {
    return {
      location: formData.location,
      checkIn: convertDateToJSON(formData.selectedDate),
      checkOut: convertDateToJSON(
        nextDayAmount(formData.selectedDate, formData.numberOfDays)
      ),
      lang: "ru",
      limit: 100,
    };
  };

  /* complete API data with UI data and check in Favorites Array*/
  const completeData = (data, UIdata) => {
    const date = convertDateToJSON(UIdata.selectedDate);
    return data.map((element) => {
      const matchingElement = favorites.favArray.find(
        (item) => element.hotelId === item.id
      );
      return {
        id: element.hotelId,
        hotelName: element.hotelName,
        stars: element.stars,
        priceFrom: element.priceFrom,
        checkIn: date,
        numberOfDays: UIdata.numberOfDays,
        isFav: matchingElement,
        location: element.location.name,
      };
    });
  };

  const fetchHotelData = useCallback(async (searchParams) => {
    try {
      const queryStringSearchParams = await toQueryStringData(
        transformFormData(searchParams)
      );
      const fetched = await request(
        `https://engine.hotellook.com/api/v2/cache.json${queryStringSearchParams}`,
        "GET",
        null
      );
      dispatch(setSearchArr(completeData(fetched, searchParams)));
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  }, []);

  return { fetchHotelData };
}
