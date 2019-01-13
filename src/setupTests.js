import 'jest-localstorage-mock';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.app = {
  translations: {
    EN: {
      App: {
        Name: 'Deadfire AI Editor',
        Placeholder: 'This is the placeholder: %PH%',
      },
      AppError: {
        ErrorTxt: 'Error Loading',
      },
      Expander: {
        Expand: 'Expand Menu',
        Contract: 'Contract Menu',
      },
      NewLayout: {
        Headline: 'Welcome to the Deadfire AI Editor',
        Description: 'Please provide the full path to your install of Deadfire.',
      },
      Toastr: {
        PersistenceError: 'Error Saving',
      },
    },
    DE: {
      App: {
        Name: 'DE - Deadfire AI Editor',
        Placeholder: 'DE - This is the placeholder: %PH%',
      },
      AppError: {
        ErrorTxt: 'DE - Error Loading',
      },
      Expander: {
        Expand: 'DE - Expand Menu',
        Contract: 'DE - Contract Menu',
      },
      NewLayout: {
        Headline: 'DE - Welcome to the Deadfire AI Editor',
        Description: 'DE - Please provide the full path to your install of Deadfire.',
      },
      Toastr: {
        PersistenceError: 'DE - Error Saving',
      },
    },
  },
  languages: ['EN'],
  curLang: 'EN',
  defLang: 'EN',
};
