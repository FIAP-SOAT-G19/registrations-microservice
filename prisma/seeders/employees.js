const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const employeesGenerate = (amount) => {
  const employees = []

  for (let i = 1; i <= amount; i++) {
    employees.push({
      id: crypto.randomUUID(),
      name: `Employee Test ${i}`,
      email: `employee${i}@email.com`,
      cpf: new Date().getTime().toString().slice(2),
      password: bcrypt.hashSync(`employee${i}`, 10),
      createdAt: new Date()
    })
  }

  return employees
}
module.exports = employeesGenerate
