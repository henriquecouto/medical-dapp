pragma solidity ^0.5.8;

contract Medical {
    struct Exam {
        string name;
        string typeExam;
    }
    Exam[] public exams;
    
    constructor() public {}

    function addExam(string memory _name, string memory _typeExam) public {
        require (bytes(_name).length > 0 && bytes(_typeExam).length > 0 );

        Exam memory newExam;

        newExam.name = _name;
        newExam.typeExam = _typeExam;

        exams.push(newExam);
    }

    // Não precisa pq o array já entrega um get automaticamente
    function getExam(uint index) public view returns(string memory, string memory) {
        return (exams[index].name, exams[index].typeExam);
    }
}