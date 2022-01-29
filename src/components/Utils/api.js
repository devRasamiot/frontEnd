  
  export default function getApi () {
    const url = 'http://213.232.124.169:9017'
    const managementUrl = 'http://localhost:8000'
    const gatewayUrl = 'http://localhost:8080'
    // const baseUrl = managementUrl + '/management/api/'
    // const nakedUrl = managementUrl
    // const gatewayURL = gatewayUrl + '/gateway/'

    const baseUrl = url + '/management/api/'
    const nakedUrl = url
    const gatewayURL = url + '/gateway/'

    return [baseUrl, nakedUrl, gatewayURL];
  };
