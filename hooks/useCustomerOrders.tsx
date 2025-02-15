import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../graphQL/queries';

function useCustomerOrders(userId: String) {
  const {loading, error, data} = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if(!data) return;

    const orders: Order[] = data.getOrders.map(({value}: OrderResponse) => ({
      Address: value.Address,
      City: value.City,
      carrier: value.carrier,
      createdAt: value.createdAt,
      Lat: value.Lat,
      Lng: value.Lng,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
    }));

    const customerOrders = orders.filter(order => order.trackingItems.customer_id === userId);

    setOrders(customerOrders);
    console.log(orders);

  }, [userId, data])

  return {loading, error, orders};
}

export default useCustomerOrders