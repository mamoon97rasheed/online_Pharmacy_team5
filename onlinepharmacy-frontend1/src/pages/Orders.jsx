import { useEffect, useState } from 'react'
import { getOrders } from '../lib/api'
import { useAuth } from '../state/AuthContext'

export default function Orders(){
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
      try{
        const res = await getOrders(user.username)
        setOrders(res || [])
      }catch(e){ /* ignore */ }
      finally{ setLoading(false) }
    })()
  }, [])

  if(loading) return <div className="p-6">Loading orders...</div>

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Your Orders</h1>
      {orders.length === 0 ? <div className="p-4 bg-white rounded shadow">No orders yet</div> : (
        <div className="space-y-3">
          {orders.map((o, i)=> (
            <div key={i} className="bg-white rounded shadow p-4">
              <div className="font-medium">Order #{o.orderId || o.id}</div>
              <div className="text-sm text-slate-600">Items: {o.items?.length || o.orderItems?.length || 0}</div>
              <div className="text-sm text-slate-600">Status: {o.status || 'PLACED'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
