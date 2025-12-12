import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminFixer() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const detectAndGenerateSQL = async () => {
    setLoading(true);
    setResult("Detecting your email...");

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setResult(`
❌ NOT LOGGED IN

Please log in to the admin panel first, then come back here.
        `);
        setLoading(false);
        return;
      }

      const sql = `-- Create admin record for ${user.email}

DELETE FROM admin_users WHERE user_id = '${user.id}';

INSERT INTO admin_users (user_id, email, role, permissions)
VALUES (
  '${user.id}',
  '${user.email}',
  'super_admin',
  '{"all": true}'::jsonb
);

-- Verify it was created
SELECT * FROM admin_users WHERE user_id = '${user.id}';`;

      setResult(`✅ Found your account!

Email: ${user.email}
User ID: ${user.id}

📋 COPY THIS SQL:

${sql}

🔗 Then go to: https://supabase.com/dashboard/project/hhdronajrkxnetwqppkg/sql/new

Paste it and click "Run"

Then click "Test Course Creation" button below.
      `);

      // Copy to clipboard
      navigator.clipboard.writeText(sql);
      alert("✅ SQL copied to clipboard! Now paste it in Supabase SQL Editor.");
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testCourseCreation = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setResult("❌ Not logged in");
        setLoading(false);
        return;
      }

      // Check admin record
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        setResult(
          `❌ Error checking admin: ${adminError.message}\n\nYou may need to run the SQL fix first.`
        );
        setLoading(false);
        return;
      }

      if (!adminData) {
        setResult(`❌ Admin record NOT found

The SQL didn't work. Make sure you:
1. Copied the EXACT SQL
2. Pasted it in Supabase SQL Editor
3. Clicked "Run"
4. Saw "Success" message

Click "Generate SQL" again and try once more.`);
        setLoading(false);
        return;
      }

      setResult(
        `✅ ADMIN RECORD EXISTS!\n\n${JSON.stringify(
          adminData,
          null,
          2
        )}\n\nNow testing course creation...`
      );

      // Test course creation
      const testCourse = {
        title: "TEST COURSE - DELETE ME",
        type: "industrial_training",
        status: "draft",
        price_cents: 0,
        thumbnail_url: "https://example.com/test.jpg",
      };

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .insert([testCourse])
        .select();

      if (courseError) {
        setResult(
          (prev) =>
            prev +
            `\n\n❌ Course creation FAILED: ${courseError.message}\n\nRLS policies might still be wrong.`
        );
      } else {
        const courseId = courseData[0].id;
        setResult(
          (prev) =>
            prev +
            `\n\n✅✅✅ COURSE CREATION WORKS!\n\nCreated test course ID: ${courseId}\n\n🎉 YOUR ADMIN PANEL IS NOW FIXED! 🎉\n\nGo create your real courses now!`
        );

        // Clean up
        await supabase.from("courses").delete().eq("id", courseId);
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ color: "#fbbf24" }}>🔧 Fix Admin Record</h1>
      <p>This will detect YOUR email and create the admin record.</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={detectAndGenerateSQL}
          disabled={loading}
          style={{
            background: "#fbbf24",
            color: "#0f172a",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          1. Generate SQL for My Email
        </button>

        <button
          onClick={testCourseCreation}
          disabled={loading}
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          2. Test Course Creation
        </button>
      </div>

      {result && (
        <pre
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            color: "#e2e8f0",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
