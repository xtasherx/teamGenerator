class Charachter {
    constructor(name,id,email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){};
    getID(){};
    getEmail(){};
    getRole(){};
}

class Manager extends Employee{
    
    constructor(officeNumber){
        this.officeNumber = officeNumber;       
    }
    getRole();
}

class Engineer extends Employee{
    constructor(github){
        this.github = github;
    }

    getGithub(){};
    getRole(){};

}

class Intern extends Employee{
    constructor(school){
        this.school = school;
    }
    getRole(){};
}