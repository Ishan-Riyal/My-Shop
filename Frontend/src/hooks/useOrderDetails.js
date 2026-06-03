import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../slices/ordersSlice";

export const useOrderDetails = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId, {
    skip: !orderId,
  });

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  useEffect(() => {
    if (orderId) {
      refetch();
    }
  }, [orderId, refetch]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order updated to Delivered");
    } catch (err) {
      const errorMessage =
        err?.data?.message || err.error || "Delivery update failed";
      toast.error(errorMessage);
    }
  };

  return {
    order,
    userInfo,
    isLoading,
    error,
    deliverHandler,
    loadingDeliver,
  };
};
