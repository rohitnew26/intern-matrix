import{j as a,k as i}from"./index-DITIZL26.js";import{r as u}from"./router-Z28cWG60.js";import"./react-Bq7xPAhO.js";import"./ui-DI8vkpLQ.js";function R(){const[d,r]=u.useState(""),[c,t]=u.useState(!1),p=async()=>{t(!0),r("Detecting your email...");try{const{data:{user:e},error:o}=await i.auth.getUser();if(o||!e){r(`
❌ NOT LOGGED IN

Please log in to the admin panel first, then come back here.
        `),t(!1);return}const s=`-- Create admin record for ${e.email}

DELETE FROM admin_users WHERE user_id = '${e.id}';

INSERT INTO admin_users (user_id, email, role, permissions)
VALUES (
  '${e.id}',
  '${e.email}',
  'super_admin',
  '{"all": true}'::jsonb
);

-- Verify it was created
SELECT * FROM admin_users WHERE user_id = '${e.id}';`;r(`✅ Found your account!

Email: ${e.email}
User ID: ${e.id}

📋 COPY THIS SQL:

${s}

🔗 Then go to: https://supabase.com/dashboard/project/hhdronajrkxnetwqppkg/sql/new

Paste it and click "Run"

Then click "Test Course Creation" button below.
      `),navigator.clipboard.writeText(s),alert("✅ SQL copied to clipboard! Now paste it in Supabase SQL Editor.")}catch(e){r(`❌ Error: ${e.message}`)}t(!1)},m=async()=>{t(!0),r("Testing...");try{const{data:{user:e}}=await i.auth.getUser();if(!e){r("❌ Not logged in"),t(!1);return}const{data:o,error:s}=await i.from("admin_users").select("*").eq("user_id",e.id).maybeSingle();if(s){r(`❌ Error checking admin: ${s.message}

You may need to run the SQL fix first.`),t(!1);return}if(!o){r(`❌ Admin record NOT found

The SQL didn't work. Make sure you:
1. Copied the EXACT SQL
2. Pasted it in Supabase SQL Editor
3. Clicked "Run"
4. Saw "Success" message

Click "Generate SQL" again and try once more.`),t(!1);return}r(`✅ ADMIN RECORD EXISTS!

${JSON.stringify(o,null,2)}

Now testing course creation...`);const g={title:"TEST COURSE - DELETE ME",type:"industrial_training",status:"draft",price_cents:0,thumbnail_url:"https://example.com/test.jpg"},{data:f,error:l}=await i.from("courses").insert([g]).select();if(l)r(n=>n+`

❌ Course creation FAILED: ${l.message}

RLS policies might still be wrong.`);else{const n=f[0].id;r(E=>E+`

✅✅✅ COURSE CREATION WORKS!

Created test course ID: ${n}

🎉 YOUR ADMIN PANEL IS NOW FIXED! 🎉

Go create your real courses now!`),await i.from("courses").delete().eq("id",n)}}catch(e){r(`❌ Error: ${e.message}`)}t(!1)};return a.jsxs("div",{style:{maxWidth:"900px",margin:"40px auto",padding:"20px",fontFamily:"monospace"},children:[a.jsx("h1",{style:{color:"#fbbf24"},children:"🔧 Fix Admin Record"}),a.jsx("p",{children:"This will detect YOUR email and create the admin record."}),a.jsxs("div",{style:{marginTop:"20px"},children:[a.jsx("button",{onClick:p,disabled:c,style:{background:"#fbbf24",color:"#0f172a",border:"none",padding:"12px 24px",borderRadius:"6px",fontSize:"16px",fontWeight:"bold",cursor:"pointer",marginRight:"10px"},children:"1. Generate SQL for My Email"}),a.jsx("button",{onClick:m,disabled:c,style:{background:"#22c55e",color:"white",border:"none",padding:"12px 24px",borderRadius:"6px",fontSize:"16px",fontWeight:"bold",cursor:"pointer"},children:"2. Test Course Creation"})]}),d&&a.jsx("pre",{style:{background:"#1e293b",border:"1px solid #334155",borderRadius:"8px",padding:"20px",marginTop:"20px",whiteSpace:"pre-wrap",color:"#e2e8f0"},children:d})]})}export{R as default};
