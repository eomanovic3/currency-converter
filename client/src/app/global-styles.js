import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .mainCurrencyConverterSquare{
    max-width: 91%;
    max-height: 100%;
    height: fit-content;
    min-height:16rem;
   }
   
   .secondCurrencyConverterSquare{
    max-width: 91%;
    max-height: 100%;
    height: fit-content;
    min-height:30rem;
   }
   
   .fitContentHeight{
    height: fit-content;
   }
   
   .mt13rem{
     min-height: 13rem !important;
   }
    .loginButton{
        background-color: #3f51b5;
        border: 1px solid #3f51b5;
    }
    
    .formMargins{
       margin:15% 0% 0% 35% !important
    }
`;

export default GlobalStyle;
