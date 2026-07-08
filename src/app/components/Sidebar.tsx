export default function Sidebar() {

  return (

    <div className="w-64 h-screen bg-blue-700 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">VSM CRM</h1>

      <ul className="space-y-4">

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Dashboard

        </li>

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Customers

        </li>

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Lead Pipeline

        </li>

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Analytics

        </li>

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Reminders

        </li>

        <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">

          Notes

        </li>

      </ul>

    </div>

  );

}