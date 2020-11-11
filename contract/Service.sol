pragma solidity ^0.4.24;

contract ServiceInterface{
    
    // 1. request service: need service provider's address and service id(token)
    function requestService(string sp_address, string token) public;
    
    // 2. service provider promise the service by publishing the hash value
    function publicHashSP(bytes32 hash_EncryptedS, string token) public;
    
    // 3. client confirm the service by confirming the hash value on-chain
    function publicHashClient(bytes32 hash_EncryptedS, string token) public;
    
    // 4. service provider send the encryption key
    function publicKey(string encrypted_key, string token) public;
    

     
    function get_sp_address(string token) public view returns(string);
    
    function get_hash_encrypted_s(string token) public view returns(bytes32);
    
    function get_encrypted_key(string token) public view returns(string);


    // set and get the publicKey of client
    function setPublicKey(string client_address, string publicKey) public;
    
    function get_publicKey(string client_address) public view returns(string);
    
}

contract Service is ServiceInterface{
    event RequestService(string ret);
    event SP_Public_HashOfEncryptedS(string ret);
    event Client_Public_HashOfEncryptedS(string ret);
    event SP_Public_EncryptedKey(string ret);
        
    struct ServiceRequest{
        // 1. sp address
        string sp_address;  
        // 2. Hash(Encryptd(S))
        bytes32 hash_encryptedS;
        // 3. encryption key 
        string encrypted_key;
    }
    
    
    mapping(string => ServiceRequest) serviceRequest;
    mapping(string => string) address_publicKey;
    
    
    constructor() public {
    }
    
    
    function requestService(string sp_address, string token) public{
        serviceRequest[token].sp_address = sp_address;
        
        emit RequestService('Request Service');
    }
    
    function publicHashSP(bytes32 hash_EncryptedS, string token) public{
        
        serviceRequest[token].hash_encryptedS = hash_EncryptedS;
        
        
        string memory ret = "SP Publish Hash(Encrypted S)";

        emit SP_Public_HashOfEncryptedS(ret);
    }
    
    
    function publicHashClient(bytes32 hash_EncryptedS, string token) public{
        string memory ret = '';
        if(serviceRequest[token].hash_encryptedS == hash_EncryptedS){
            ret = "Client Confirm Hash(Encrypted S)";
        }
        else{
            ret = "Transaction Terminated: Hash Not Match";
        }
        emit Client_Public_HashOfEncryptedS(ret);
    }
    
    function publicKey(string encrypted_key, string token) public{
        
        serviceRequest[token].encrypted_key = encrypted_key;
        string memory ret = "SP Publish key";    
        
        emit SP_Public_EncryptedKey(ret);
    }

    // blind the publicKey and the address  
    function setPublicKey(string client_address, string publicKey) public{
        address_publicKey[client_address] = publicKey;
    }
    
    function get_publicKey(string client_address) public view returns(string){
        return address_publicKey[client_address];
    }
    
    

    function get_sp_address(string token) public view returns(string){
        return serviceRequest[token].sp_address;
    }
    
    function get_hash_encrypted_s(string token) public view returns(bytes32){
        return serviceRequest[token].hash_encryptedS;
    }
    
    function get_encrypted_key(string token) public view returns(string){
        return serviceRequest[token].encrypted_key;
    }
    
}
