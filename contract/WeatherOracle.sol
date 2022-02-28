pragma solidity 0.8.12;

contract WeatherOracle {
  address public oracleAddress;

  constructor (address _oracleAddress) {
    oracleAddress = _oracleAddress;
  }
  struct Datas {
    string city;
    string temperature;
  }

  mapping (bytes32 => Datas) private datas;

  event WeatherUpdate (
    string city,
    string temperature
  );

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
                result := mload(add(source, 32))
        }
    }

  function updateWeather (
    string memory _citycode,
    string memory _city,
    string memory _temperature
  )
  public
  {
    require(msg.sender == oracleAddress);
    datas[stringToBytes32(_citycode)].city = _city;
    datas[stringToBytes32(_citycode)].temperature = _temperature;

    emit WeatherUpdate (
      _city,
      _temperature
    );
  }

  function getData(string memory _citycode) public view returns (string memory, string memory){
    return (datas[stringToBytes32(_citycode)].city, datas[stringToBytes32(_citycode)].temperature);
  }
}