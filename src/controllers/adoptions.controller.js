import { adoptionsService, petsService, usersService } from "../services/index.js";
import Adoption from '../dao/models/Adoption.js';

const getAllAdoptions = async (req, res) => {
  const result = await adoptionsService.getAll();
  res.send({ status: "success", payload: result });
};

const getAdoption = async (req, res) => {
  const adoptionId = req.params.aid;
  const adoption = await adoptionsService.getBy({ _id: adoptionId });
  if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
  res.send({ status: "success", payload: adoption });
};

const createAdoption = async (req, res) => {
  const { uid, pid } = req.params;

  const user = await usersService.getUserById(uid);
  if (!user) return res.status(404).send({ status: "error", error: "User not found" });

  const pet = await petsService.getBy({ _id: pid });
  if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
  if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

  user.pets.push(pet._id);
  await usersService.update(user._id, { pets: user.pets });
  await petsService.update(pet._id, { adopted: true, owner: user._id });

  const adoption = await adoptionsService.create({ owner: user._id, pet: pet._id });

  res.status(201).send({
    status: "success",
    message: "Pet adopted",
    payload: adoption
  });
};

const getAdoptionById = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.aid); 
    if (!adoption) {
      return res.status(404).json({ status: 'error', error: 'Adoption not found' });
    }
    return res.status(200).json({ status: 'success', payload: adoption });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
};

export {
  createAdoption,
  getAllAdoptions,
  getAdoption,
  getAdoptionById
};

