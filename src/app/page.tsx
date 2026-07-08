import Sidebar from "./components/Sidebar";
export default function Home() {
  return (
    <div className="flex">

  <Sidebar />

  <main className="flex-1 min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-700">
        VSM CRM Dashboard
      </h1>

      <p className="mt-3 text-gray-700">
        Welcome to Member C CRM Module
      </p>

      <div className="grid grid-cols-4 gap-5 mt-10">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Total Leads</h2>
          <p className="text-3xl font-bold mt-3">250</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">New Customers</h2>
          <p className="text-3xl font-bold mt-3">48</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Follow Ups</h2>
          <p className="text-3xl font-bold mt-3">35</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Sales</h2>
          <p className="text-3xl font-bold mt-3">$12,500</p>
        </div>

      </div>
      <div className="bg-white rounded-xl shadow mt-8 p-5">

  <h2 className="text-2xl font-bold mb-4">Customer List</h2>

  <table className="w-full border">

    <thead className="bg-blue-600 text-white">

      <tr>

        <th className="p-3">Name</th>

        <th className="p-3">Email</th>

        <th className="p-3">Status</th>

      </tr>

    </thead>

    <tbody>

      <tr className="border">

        <td className="p-3">Ali Khan</td>

        <td className="p-3">ali@gmail.com</td>

        <td className="p-3 text-green-600 font-bold">Active</td>

      </tr>

      <tr className="border">

        <td className="p-3">Ahmed</td>

        <td className="p-3">ahmed@gmail.com</td>

        <td className="p-3 text-yellow-600 font-bold">Pending</td>

      </tr>

      <tr className="border">

        <td className="p-3">Sara</td>

        <td className="p-3">sara@gmail.com</td>

        <td className="p-3 text-red-600 font-bold">Inactive</td>

      </tr>

    </tbody>

  </table>

</div>
    </main>
    </div>
  );
}