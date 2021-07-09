import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Utkarsh',
    email: 'ug123@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Vinayak',
    email: 'vinayak@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Vansh',
    email: 'vansh@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
