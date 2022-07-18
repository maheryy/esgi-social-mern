import { STATUS_ACCEPTED, STATUS_HOLD } from "../../services/constants";
import Tooltip from "../../components/Tooltip";

export const ActionButton = ({ status, action }) => {
  switch (status) {
    case STATUS_HOLD:
      return (
        <Tooltip content="Invitation envoyée">
          <button disabled
                  className="rounded-full text-sm border disabled:bg-teal-700 disabled:opacity-50 border-teal-600 bg-teal-600 text-white p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"/>
            </svg>
          </button>
        </Tooltip>
      );
    case STATUS_ACCEPTED:
      return (
        <Tooltip content="Vous êtes amis">
          <button disabled
                  className="rounded-full text-sm border disabled:bg-teal-700 disabled:opacity-50 border-teal-600 bg-teal-600 text-white p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"/>
            </svg>
          </button>
        </Tooltip>
      );
    default:
      return (
        <button
          onClick={action}
          className="rounded-full text-sm border border-teal-600 bg-teal-600 text-white p-2 transition duration-300 ease select-none hover:bg-teal-700 focus:outline-none focus:shadow-outline"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
        </button>
      );
  }
};