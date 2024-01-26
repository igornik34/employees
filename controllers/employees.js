const e = require("express");
const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось получить всех сотрудников" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Заполните обязательные поля!" });
    }
    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    return res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Не удалось добавить сотрудника" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({message: "OK"});
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const {id} = req.params;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Заполните обязательные поля!" });
    }

    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return res.status(204).json({message: "OK"});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Не удалось редактировать сотрудника" });
  }
};

const employee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
