import React,{useEffect,useState}from'react';
import{Routes,Route,Link,useNavigate,Navigate}from'react-router-dom';
import{Leaf,ShoppingBag,LogIn,LogOut,LayoutDashboard,CheckCircle2,Menu as MenuIcon,Phone,MapPin}from'lucide-react';
import api from'./api';

const mediaUrl=(url)=>{const u=String(url||'');return u.startsWith('http')?u:`${String(import.meta.env.VITE_API_ORIGIN||'https://tiffin-api.rkveda.in').replace(/\/$/,'')}${u.startsWith('/')?'':'/'}${u}`};

const BUSINESS={
  name:'RKVeda Tiffin',
  tagline:'Ghar Jaisa Khana, Roz Aapke Ghar',
  city:'Vrindavan, Mathura',
  state:'Uttar Pradesh',
  mobile1:'+91 81260 37298',
  mobile2:'+91 98730 81994',
  email:'tiffinrkveda@gmail.com'
};

function Header(){
  const nav=useNavigate(),[o,setO]=useState(false),token=localStorage.getItem('rkveda_token'),role=localStorage.getItem('rkveda_role'),isAdmin=['admin','super_admin'].includes(role);
  const logout=()=>{localStorage.clear();nav('/')};
  return <header><div className="container nav"><Link className="brand" to="/"><Leaf/><span><b>RKVeda</b> Tiffin<small>Vrindavan • Mathura · {BUSINESS.tagline}</small></span></Link><button className="mob" onClick={()=>setO(!o)}><MenuIcon/></button><nav className={o?'open':''}><Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/plans">Plans</Link><Link to="/how-it-works">How It Works</Link>{isAdmin?<Link to="/admin"><LayoutDashboard size={16}/> Admin</Link>:<Link className="link" to="/admin/login"><LayoutDashboard size={16}/> Admin</Link>}{token&&<Link className="link" to="/my-orders">My Orders</Link>}{token?<button className="link" onClick={logout}><LogOut size={16}/> Logout</button>:<Link className="outline" to="/login"><LogIn size={16}/> Login</Link>}<Link className="primary" to="/order"><ShoppingBag size={16}/> Order Now</Link></nav></div></header>
}

function Layout({children}){
  return <><div className="devotional-bg" aria-hidden="true"/><Header/>{children}<footer><div className="container foot"><div><div className="brand light"><Leaf/><span><b>RKVeda</b> Tiffin<small>Vrindavan • Mathura · {BUSINESS.tagline}</small></span></div><p>Fresh, hygienic North Indian home-style meals prepared for Vrindavan and Mathura customers.</p></div><div><h4>Quick Links</h4><Link to="/menu">Weekly Menu</Link><Link to="/plans">Pricing</Link><Link to="/order">Order Tiffin</Link></div><div><h4>Support</h4><p><Phone size={14}/> <a href="tel:+918126037298">{BUSINESS.mobile1}</a></p><p><Phone size={14}/> <a href="tel:+919873081994">{BUSINESS.mobile2}</a></p><p><MapPin size={14}/> {BUSINESS.city}, {BUSINESS.state}</p><p>{BUSINESS.email}</p><h4>Policies</h4><Link to="/contact">Contact Us</Link><Link to="/terms">Terms & Conditions</Link><Link to="/refund-cancellation">Refunds & Cancellations</Link><Link to="/privacy">Privacy Policy</Link></div></div><div className="copy">© 2026 RKVeda Tiffin · Vrindavan • Mathura · All rights reserved</div></footer></>
}

function MenuCard({d}){
  return <div className="menuday"><div className="day"><h3>{d.day_name}</h3><span>4 Roti • Salad • Raita • Disposable Thali</span></div><div className="meals">{['lunch','dinner'].map(m=><div className="meal" key={m}>{d[m+'_image_url']&&<img className="mealimage" src={mediaUrl(d[m+'_image_url'])} alt={`${d.day_name} ${m}`} onError={e=>e.currentTarget.style.display='none'}/>}<h3>{m==='lunch'?'☀️ Lunch':'🌙 Dinner'} <b>₹100</b></h3><ul><li>Dal: {d[m+'_dal']}</li><li>Sukhi Sabji: {d[m+'_dry_sabzi']}</li><li>Rice: {d[m+'_rice']}</li><li>Salad: {d[m+'_salad']}</li><li>Raita: {d[m+'_raita']}</li><li>4 Roti + Disposable Packing</li></ul></div>)}</div></div>
}

function Home(){
  const[t,setT]=useState(),[p,setP]=useState([]);
  useEffect(()=>{api.get('/menu/today').then(x=>setT(x.data)).catch(()=>{});api.get('/plans').then(x=>setP(x.data.slice(0,3))).catch(()=>{})},[]);
  return <><section className="hero"><div className="container herogrid"><div><span className="eyebrow">VRINDAVAN • MATHURA • FRESH DAILY</span><h1>Ghar Jaisa North Indian Khana <em>Delivered in Vrindavan</em></h1><p>Fresh, balanced lunch and dinner thalis for students, professionals, families and devotees staying in Vrindavan.</p><div className="actions"><Link className="primary big" to="/order">Order Tiffin →</Link><Link className="outline big" to="/menu">View Weekly Menu</Link></div><div className="trust"><span><CheckCircle2/> Fresh Ingredients</span><span><CheckCircle2/> Home-style Cooking</span><span><CheckCircle2/> FREE Delivery</span></div></div><div className="heroimage"><div>🍱</div><strong>₹100 / meal</strong><small>Vrindavan • Mathura</small></div></div></section><div className="strip"><div className="container stripgrid"><span>📅 7-Day Menu</span><span>₹100 / Meal</span><span>🥗 Balanced Thali</span><span>🚚 FREE Delivery</span><span>📦 Disposable Packing</span></div></div><section className="section container"><div className="head"><div><span className="eyebrow">TODAY'S FOOD</span><h2>Today's Menu</h2></div><Link to="/menu">Full week →</Link></div>{t?<MenuCard d={t}/>:<p>Loading menu...</p>}</section><section className="section alt"><div className="container"><div className="head"><div><span className="eyebrow">SIMPLE PRICING</span><h2>Our Plans</h2></div><Link to="/plans">All plans →</Link></div><div className="cards">{p.map(x=><PlanCard p={x} key={x.id}/>)}</div></div></section></>
}

function Menu(){const[d,setD]=useState([]);useEffect(()=>{api.get('/menu/weekly').then(x=>setD(x.data)).catch(()=>{})},[]);return <main className="page container"><span className="eyebrow">VRINDAVAN WEEKLY MENU</span><h1>7 Days of Ghar Jaisa Khana</h1><p className="lead">Lunch and dinner menus are managed by the RKVeda admin team. Freshly prepared for our Vrindavan service.</p>{d.map(x=><MenuCard d={x} key={x.id}/>)}</main>}
function PlanCard({p}){return <div className="card"><h3>{p.name}</h3><div className="planprice">₹{Number(p.price).toLocaleString('en-IN')} <small>{p.duration_days===1?'/ meal':`/ ${p.duration_days} days`}</small></div><p>{p.description}</p><ul><li>Dal + Sukhi Sabji</li><li>Rice + 4 Roti</li><li>Salad + Raita</li><li>Disposable Packing</li><li>FREE Delivery</li></ul><Link className="primary full" to={'/order?plan='+p.id}>Choose Plan</Link></div>}
function Plans(){const[p,setP]=useState([]);useEffect(()=>{api.get('/plans').then(x=>setP(x.data)).catch(()=>{})},[]);return <main className="page container"><span className="eyebrow">VRINDAVAN TIFFIN PLANS</span><h1>Simple & Transparent</h1><p className="lead">₹100 per lunch or dinner thali with free delivery. Subscription plans are available for regular customers.</p><div className="cards">{p.map(x=><PlanCard p={x} key={x.id}/>)}</div></main>}

function Login(){const[reg,setReg]=useState(false),[f,setF]=useState({}),[e,setE]=useState(''),nav=useNavigate();const go=async ev=>{ev.preventDefault();try{const x=await api.post('/auth/'+(reg?'register':'login'),f);localStorage.setItem('rkveda_token',x.data.token);localStorage.setItem('rkveda_user',JSON.stringify(x.data.user));nav('/order')}catch(x){setE(x.response?.data?.message||'Login failed')}};return <main className="auth"><form className="form" onSubmit={go}><h2>{reg?'Create Account':'Welcome Back'}</h2>{reg&&<input placeholder="Full name" required onChange={x=>setF({...f,name:x.target.value})}/>}<input placeholder="Mobile number" inputMode="numeric" maxLength="10" required onChange={x=>setF({...f,mobile:x.target.value})}/>{reg&&<input placeholder="Email (optional)" onChange={x=>setF({...f,email:x.target.value})}/>}<input type="password" placeholder="Password" required onChange={x=>setF({...f,password:x.target.value})}/>{e&&<div className="error">{e}</div>}<button className="primary full">{reg?'Register':'Login'}</button><button type="button" className="link" onClick={()=>setReg(!reg)}>{reg?'Already registered? Login':'New customer? Register'}</button><Link className="link" to="/admin-login">Admin Login</Link></form></main>}

function AdminLogin(){const[f,setF]=useState({}),[e,setE]=useState(''),nav=useNavigate();const go=async ev=>{ev.preventDefault();try{const x=await api.post('/auth/admin-login',f);localStorage.setItem('rkveda_token',x.data.token);localStorage.setItem('rkveda_role',x.data.user.role);nav('/admin')}catch(x){setE(x.response?.data?.message||'Login failed')}};return <main className="auth"><form className="form" onSubmit={go}><h2>RKVeda Admin</h2><input placeholder="Admin mobile" inputMode="numeric" required onChange={x=>setF({...f,mobile:x.target.value})}/><input type="password" placeholder="Password" required onChange={x=>setF({...f,password:x.target.value})}/>{e&&<div className="error">{e}</div>}<button className="primary full">Login</button></form></main>}

function Order(){
  const[p,setP]=useState([]),[a,setA]=useState([]),[f,setF]=useState({}),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false),[paymentMethod,setPaymentMethod]=useState('online');
  const nav=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('rkveda_token'))return nav('/login');
    Promise.all([
      api.get('/plans'),
      api.get('/customer/profile')
    ]).then(([plansRes,profileRes])=>{
      setP(plansRes.data||[]);
      const queryPlan=new URLSearchParams(window.location.search).get('plan');
      const requestedPlan=(plansRes.data||[]).find(x=>x.id===Number(queryPlan));
      if(requestedPlan)setF(prev=>({...prev,plan_id:requestedPlan.id}));
      const addresses=profileRes.data?.addresses||[];
      setA(addresses);
      const defaultAddress=addresses.find(x=>Number(x.is_default)===1)||addresses[0];
      if(defaultAddress)setF(prev=>({...prev,address_id:defaultAddress.id}));
    }).catch(e=>setMsg(e.response?.data?.message||'Unable to load order details'));
  },[nav]);

  const plan=p.find(x=>x.id===Number(f.plan_id));

  const save=async()=>{
    setMsg('');
    if(!f.address_line1?.trim()||!f.pincode?.trim())return setMsg('Please enter address and pincode');
    if(!/^\d{6}$/.test(f.pincode))return setMsg('Please enter a valid 6-digit pincode');
    try{
      const payload={address_line1:f.address_line1.trim(),area:f.area?.trim()||'',pincode:f.pincode.trim(),city:'Vrindavan',state:'Uttar Pradesh',is_default:1};
      const x=await api.post('/customer/addresses',payload);
      const id=x.data?.id||x.data?.address?.id;
      const saved=x.data?.address||{id,...payload};
      if(!id)throw new Error('Address was not saved by the server');
      setA(prev=>[saved,...prev.filter(item=>Number(item.id)!==Number(id))]);
      setF(prev=>({...prev,address_id:id}));
      setMsg('Delivery address saved successfully');
    }catch(x){setMsg(x.response?.data?.message||x.message||'Address could not be saved')}
  };

  const createOrder=async()=>{
    if(!plan)return setMsg('Please select a plan');
    if(!f.address_id)return setMsg('Please select or save a delivery address');
    if(!paymentMethod)return setMsg('Please select a payment method');
    const o=await api.post('/orders',{
      plan_id:plan.id,
      address_id:Number(f.address_id),
      order_type:plan.duration_days>1?'subscription':'one_time',
      meal_type:plan.meal_type,
      quantity:1,
      payment_method:paymentMethod==='cod'?'cod':'online'
    });
    return o.data;
  };

  const pay=async()=>{
    try{
      setBusy(true);setMsg('');
      const o=await createOrder();
      const orderId=Number(o?.orderId ?? o?.order_id ?? o?.id ?? o?.order?.id ?? o?.order?.orderId);
      if(!orderId)throw new Error('Order was created but the server did not return an order ID. Please refresh My Orders and check the order before retrying.');
      if(paymentMethod==='cod'){
        setBusy(false);
        const payable=Number(o?.amount ?? o?.total_amount ?? o?.order?.amount ?? o?.order?.total_amount ?? plan.price);
        setMsg('COD order placed successfully. Please keep ₹'+payable.toLocaleString('en-IN')+' ready at delivery.');
        setTimeout(()=>nav('/my-orders'),1100);
        return;
      }
      localStorage.setItem('rkveda_pending_order_id',String(orderId));
      setMsg('Creating secure Cashfree payment...');
      const q=await api.post('/payments/create',{order_id:orderId});
      if(!q.data?.payment_session_id)throw new Error('Cashfree payment session was not returned by the server');
      if(typeof window.Cashfree!=='function')throw new Error('Cashfree checkout SDK is not loaded. Please refresh and try again.');
      const cashfree=window.Cashfree({mode:import.meta.env.VITE_CASHFREE_MODE||'sandbox'});
      const result=await cashfree.checkout({paymentSessionId:q.data.payment_session_id});
      if(result?.error){setBusy(false);setMsg(result.error.message||'Cashfree checkout could not be opened');}
    }catch(x){setBusy(false);setMsg(x.response?.data?.message||x.message||'Order/payment failed')}
  };

  return <main className="page container checkout">
    <div>
      <span className="eyebrow">ORDER TIFFIN • VRINDAVAN</span>
      <h1>Fresh meals, delivered free</h1>
      <p className="lead">₹100 lunch or dinner thali • Dal • Sukhi Sabji • Rice • 4 Roti • Salad • Raita • Disposable Packing</p>
      <label>Choose Plan<select value={f.plan_id||''} onChange={x=>setF({...f,plan_id:x.target.value})}><option value="">Select a plan</option>{p.map(x=><option key={x.id} value={x.id}>{x.name} — ₹{Number(x.price).toLocaleString('en-IN')}</option>)}</select></label>
      <h3>Delivery Address</h3>
      {a.length>0&&<select value={f.address_id||''} onChange={x=>setF({...f,address_id:Number(x.target.value)})}><option value="">Select saved address</option>{a.map(x=><option key={x.id} value={x.id}>{x.address_line1}, {x.area||''}, {x.city||'Vrindavan'}, {x.pincode}</option>)}</select>}
      <div className="address">
        <input value={f.address_line1||''} placeholder="House / Flat / Address line" onChange={x=>setF({...f,address_line1:x.target.value})}/>
        <input value={f.area||''} placeholder="Area / Colony in Vrindavan" onChange={x=>setF({...f,area:x.target.value})}/>
        <input value={f.pincode||''} placeholder="Pincode" inputMode="numeric" maxLength="6" onChange={x=>setF({...f,pincode:x.target.value.replace(/\D/g,'')})}/>
        <p className="fixedplace"><MapPin size={15}/> Vrindavan, Mathura, Uttar Pradesh</p>
        <button className="outline" type="button" onClick={save}>Save Address</button>
      </div>

      <h3 className="payment-title">Payment Method</h3>
      <div className="payment-options">
        <label className={'payment-option '+(paymentMethod==='cod'?'selected':'')}>
          <input type="radio" name="payment" value="cod" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')}/>
          <span><b>Cash on Delivery</b><small>Pay cash when your tiffin is delivered</small></span>
        </label>
        <label className={'payment-option '+(paymentMethod==='online'?'selected':'')}>
          <input type="radio" name="payment" value="online" checked={paymentMethod==='online'} onChange={()=>setPaymentMethod('online')}/>
          <span><b>Pay Online</b><small>Secure UPI / Card / Net Banking via Cashfree</small></span>
        </label>
      </div>
    </div>
    <aside className="summary">
      <h2>Order Summary</h2>
      <p>{plan?.name||'—'}</p>
      <p>Delivery <b>FREE</b></p>
      <div className="total">₹{Number(plan?.price||0).toLocaleString('en-IN')}</div>
      {paymentMethod&&<div className="selected-method">Payment: <b>{paymentMethod==='cod'?'Cash on Delivery':'Online Payment'}</b></div>}
      {msg&&<div className={/failed|error|could not|unable|invalid|not saved/i.test(msg)?'error':'notice'}>{msg}</div>}
      <button className="primary full" disabled={busy} onClick={pay}>{busy?(paymentMethod==='cod'?'Placing Order...':'Opening Cashfree...'):(paymentMethod==='cod'?'Place COD Order':'Pay Online Securely')}</button>
      {paymentMethod==='online'&&<small className="secure">Secure online payment powered by Cashfree</small>}
    </aside>
  </main>
}

function PaymentCallback(){
  const nav=useNavigate(),[status,setStatus]=useState('Verifying your payment...'),[error,setError]=useState('');
  useEffect(()=>{
    const internalOrderId=localStorage.getItem('rkveda_pending_order_id');
    if(!internalOrderId){setStatus('We could not find the order in this browser.');return}
    let active=true;
    api.post('/payments/verify',{order_id:Number(internalOrderId)}).then(r=>{
      if(!active)return;
      if(r.data?.success){
        localStorage.removeItem('rkveda_pending_order_id');
        setStatus('Payment successful. Your tiffin order is confirmed.');
        setTimeout(()=>nav('/my-orders'),900);
      }else{
        setStatus(`Payment status: ${r.data?.payment_status||'pending'}.`);
        setError('If you completed the payment, please wait a moment and check My Orders.');
      }
    }).catch(e=>{if(active){setStatus('Payment verification is still pending.');setError(e.response?.data?.message||'Please open My Orders after a few seconds.')}})
    return()=>{active=false};
  },[nav]);
  return <main className="auth"><div className="form"><h2>Cashfree Payment</h2><p>{status}</p>{error&&<div className="error">{error}</div>}<div className="actions"><Link className="primary" to="/my-orders">My Orders</Link><Link className="outline" to="/">Home</Link></div></div></main>
}

function MyOrders(){const[o,setO]=useState([]),[e,setE]=useState(''),nav=useNavigate();useEffect(()=>{if(!localStorage.getItem('rkveda_token')){nav('/login');return}api.get('/customer/orders').then(x=>setO(Array.isArray(x.data)?x.data:(x.data?.orders||[]))).catch(x=>setE(x.response?.data?.message||'Unable to load your orders'))},[nav]);return <main className="page container"><span className="eyebrow">RKVEDA TIFFIN • VRINDAVAN</span><h1>My Orders</h1><p className="lead">Track your tiffin orders and payment status.</p>{e&&<div className="error">{e}</div>}{!e&&!o.length&&<div className="notice">No orders found yet. <Link to="/order"><b>Place your first order →</b></Link></div>}{o.map(x=><div className="order" key={x.id}><b>{x.order_number}</b><span>{x.plan_name}</span><span>₹{Number(x.total_amount).toLocaleString('en-IN')}</span><span>{x.payment_status}</span><span>{x.order_status}</span></div>)}</main>}

function Admin(){
  const[t,setT]=useState('dashboard'),[d,setD]=useState(null),[rows,setRows]=useState([]),[menu,setMenu]=useState([]),[plans,setPlans]=useState([]),[e,setE]=useState('');
  const nav=useNavigate();
  const isAdmin=['admin','super_admin'].includes(localStorage.getItem('rkveda_role'));
  const load=async x=>{setT(x);setE('');const u={dashboard:'/admin/dashboard',orders:'/admin/orders',customers:'/admin/customers',payments:'/admin/payments',subscriptions:'/admin/subscriptions',menu:'/admin/menu',plans:'/admin/plans'};try{const r=await api.get(u[x]);if(x==='dashboard')setD(r.data);else if(x==='menu')setMenu(r.data||[]);else if(x==='plans')setPlans(r.data||[]);else setRows(r.data||[])}catch(err){if(err.response?.status===401||err.response?.status===403){localStorage.removeItem('rkveda_token');localStorage.removeItem('rkveda_role');nav('/admin/login')}else setE(err.response?.data?.message||'Unable to load admin data')}};
  useEffect(()=>{if(!isAdmin){nav('/admin/login');return}load('dashboard')},[]);
  const save=async x=>{const fd=new FormData();['lunch_dal','lunch_dry_sabzi','lunch_rice','lunch_salad','lunch_raita','dinner_dal','dinner_dry_sabzi','dinner_rice','dinner_salad','dinner_raita'].forEach(k=>fd.append(k,x[k]||''));fd.append('active','1');if(x.lunch_file)fd.append('lunch_image',x.lunch_file);if(x.dinner_file)fd.append('dinner_image',x.dinner_file);await api.put('/admin/menu/'+x.id,fd);load('menu')};
  if(!isAdmin)return null;
  return <main className="admin"><div className="container adminlayout"><aside className="sidebar"><h3>RKVeda Admin</h3>{['dashboard','orders','customers','menu','plans','subscriptions','payments'].map(x=><button className={t===x?'active':''} onClick={()=>load(x)} key={x}>{x}</button>)}</aside><section><div className="adminhead"><h1>{t}</h1><Link to="/">View Site</Link></div>{e&&<div className="error">{e}</div>}{t==='dashboard'&&d&&<div className="stats">{[['Orders',d.orders],['Lunch',d.lunch],['Dinner',d.dinner],['Revenue','₹'+Number(d.revenue).toLocaleString('en-IN')],['Customers',d.customers],['Subscriptions',d.subscriptions],['Pending',d.pendingPayments]].map(x=><div className="stat" key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div>}{['orders','customers','payments','subscriptions','plans'].includes(t)&&<Table rows={t==='plans'?plans:rows} cols={t==='orders'?['order_number','customer_name','mobile','plan_name','total_amount','payment_status','order_status']:t==='customers'?['name','mobile','orders_count','total_spent']:t==='payments'?['order_number','customer_name','amount','gateway_payment_id','method','status']:t==='subscriptions'?['subscription_number','customer_name','mobile','plan_name','start_date','end_date','status']:['name','duration_days','meal_type','price','active']}/>} {t==='menu'&&menu.map(x=><MenuEditor d={x} save={save} key={x.id}/>)}</section></div></main>
}

function MenuEditor({d,save}){const[x,setX]=useState(d);const f=['lunch_dal','lunch_dry_sabzi','lunch_rice','lunch_salad','lunch_raita','dinner_dal','dinner_dry_sabzi','dinner_rice','dinner_salad','dinner_raita'];return <div className="editor"><h3>{d.day_name}</h3><div className="editgrid">{f.map(k=><label key={k}>{k.replaceAll('_',' ')}<input value={x[k]||''} onChange={e=>setX({...x,[k]:e.target.value})}/></label>)}</div><div className="files"><label>Lunch image<input type="file" accept="image/*" onChange={e=>setX({...x,lunch_file:e.target.files[0]})}/></label><label>Dinner image<input type="file" accept="image/*" onChange={e=>setX({...x,dinner_file:e.target.files[0]})}/></label></div><button className="primary" onClick={()=>save(x)}>Save {d.day_name}</button></div>}

function Table({rows,cols}){return <div className="table"><table><thead><tr>{cols.map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{cols.map(x=><td key={x}>{String(r[x]??'')}</td>)}</tr>)}</tbody></table></div>}

function PolicyPage({type}){
  const pages={
    contact:{title:'Contact Us',intro:'RKVeda Tiffin serves fresh North Indian lunch and dinner in Vrindavan, Mathura.',body:<><h3>RKVeda Tiffin</h3><p><b>Phone:</b> <a href="tel:+918126037298">{BUSINESS.mobile1}</a> · <a href="tel:+919873081994">{BUSINESS.mobile2}</a></p><p><b>Email:</b> {BUSINESS.email}</p><p><b>Location:</b> {BUSINESS.city}, {BUSINESS.state}</p><p>For order-related support, please keep your registered mobile number and order number ready.</p></>},
    terms:{title:'Terms & Conditions',intro:'Please read these terms before placing an order with RKVeda Tiffin.',body:<><h3>1. Service Area</h3><p>RKVeda Tiffin provides prepared North Indian meals for lunch and dinner in Vrindavan, Mathura, with disposable packing and free delivery as shown on the website.</p><h3>2. Pricing</h3><p>Meal prices are displayed in Indian Rupees (INR). The applicable price shown at checkout is the amount payable for the selected plan or meal.</p><h3>3. Orders</h3><p>An order is accepted after successful checkout and confirmation by RKVeda Tiffin. Availability may depend on the selected service area and daily capacity.</p><h3>4. Delivery</h3><p>Delivery is provided to the address supplied by the customer. Customers should provide an accurate and reachable delivery address and phone number.</p><h3>5. Changes</h3><p>Menu items, service availability and operating schedules may be updated by RKVeda Tiffin when necessary.</p><h3>6. Contact</h3><p>For questions about these terms, contact {BUSINESS.email} or {BUSINESS.mobile1}.</p></>},
    refund:{title:'Refunds & Cancellations',intro:'Our refund and cancellation rules for RKVeda Tiffin orders.',body:<><h3>Order Cancellation</h3><p>Cancellation requests should be made as early as possible through our support channel. Once food preparation or delivery processing has started, cancellation may not be possible.</p><h3>Refunds</h3><p>If a refund is approved, it will be processed against the original payment method, subject to the payment gateway and banking timelines.</p><h3>Failed or Duplicate Payments</h3><p>If your account is debited but an order is not confirmed, please contact us with the payment reference and registered mobile number so that the transaction can be checked.</p><h3>Food Quality or Delivery Issue</h3><p>For a missing item, incorrect order or delivery issue, contact support as soon as possible with your order number and relevant details.</p><h3>Contact</h3><p>Phone: {BUSINESS.mobile1} · {BUSINESS.mobile2} · Email: {BUSINESS.email}</p></>},
    privacy:{title:'Privacy Policy',intro:'This page explains how RKVeda Tiffin uses information needed to provide the service.',body:<><h3>Information We Collect</h3><p>We may collect account, contact, delivery address and order information required to process orders and provide customer support.</p><h3>Payments</h3><p>Online payment details are handled by the payment gateway. RKVeda Tiffin does not ask customers to share card, UPI or banking credentials through email or chat.</p><h3>Use of Information</h3><p>Information may be used for order processing, delivery coordination, account management, service communication and support.</p><h3>Contact</h3><p>For privacy questions, contact {BUSINESS.email} or {BUSINESS.mobile1}.</p></>}
  };
  const p=pages[type]||pages.contact;return <main className="page container policy"><span className="eyebrow">RKVEDA TIFFIN • VRINDAVAN</span><h1>{p.title}</h1><p className="lead">{p.intro}</p><div className="policycard">{p.body}</div></main>
}

function Simple({title,text}){return <main className="page container"><span className="eyebrow">RKVEDA TIFFIN • VRINDAVAN</span><h1>{title}</h1><p className="lead">{text}</p></main>}
export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/menu" element={<Menu/>}/><Route path="/plans" element={<Plans/>}/><Route path="/login" element={<Login/>}/><Route path="/admin-login" element={<Navigate to="/admin/login" replace/>}/><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/order" element={<Order/>}/><Route path="/payment/callback" element={<PaymentCallback/>}/><Route path="/my-orders" element={<MyOrders/>}/><Route path="/admin" element={<Admin/>}/><Route path="/how-it-works" element={<Simple title="How It Works" text="Choose lunch, dinner or a subscription, add your Vrindavan delivery address, pay securely with Cashfree and receive your fresh disposable thali."/>}/><Route path="/contact" element={<PolicyPage type="contact"/>}/><Route path="/terms" element={<PolicyPage type="terms"/>}/><Route path="/refund-cancellation" element={<PolicyPage type="refund"/>}/><Route path="/privacy" element={<PolicyPage type="privacy"/>}/></Routes></Layout>}
