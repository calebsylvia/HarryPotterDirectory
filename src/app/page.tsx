'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react'
import { IChar } from "./Interfaces/interfaces";
import { ArrowFatLeft, ArrowFatRight, GenderFemale, GenderMale, Shuffle } from "@phosphor-icons/react";
import { spec } from "node:test/reporters";

export default function Home() {

  const [chars, setChars] = useState<IChar[]>([])
  const [name, setName] = useState<string>('')
  const [species, setSpecies] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [house, setHouse] = useState<string>('')
  const [dob, setDob] = useState<string>()
  const [yob, setYob] = useState<number>(0)
  const [wiz, setWiz] = useState<boolean>(true)
  const [anc, setAnc] = useState<string>()
  const [eye, setEye] = useState<string>()
  const [hair, setHair] = useState<string>()
  const [patronus, setPatronus] = useState<string>()
  const [student, setStudent] = useState<boolean>(false)
  const [staff, setStaff] = useState<boolean>(false)
  const [actor, setActor] = useState<string>()
  const [alive, setAlive] = useState<boolean>(true)
  const [image, setImage] = useState<string>("")


  const [shown, setShown] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)


  useEffect(() => {
    const getChars = async() => {
      const res = await fetch('https://potterhead-api.vercel.app/api/characters')
      const data: IChar[] = await res.json()
      setChars(data)
    }
    getChars()
  },[])

  useEffect(() => {
    const display = async() =>{
      const res = await fetch(`https://potterhead-api.vercel.app/api/characters`)
      const charData: IChar[] = await res.json()
      const dispChar: IChar[] = charData.filter((data) => data.name == shown)
      setName(dispChar[0].name)
      setActor(dispChar[0].actor)
      setAlive(dispChar[0].alive)
      setAnc(dispChar[0].ancestry)
      setDob(dispChar[0].dateOfBirth)
      setEye(dispChar[0].eyeColour)
      setGender(dispChar[0].gender)
      setHair(dispChar[0].hairColour)
      setHouse(dispChar[0].house)
      setStaff(dispChar[0].hogwartsStaff)
      setStudent(dispChar[0].hogwartsStudent)
      setImage(dispChar[0].image)
      setPatronus(dispChar[0].patronus)
      setSpecies(dispChar[0].species)
      setWiz(dispChar[0].wizard)
      setYob(dispChar[0].yearOfBirth)
    }
    display()
  }, [shown])

  const handleShuffle = () => {
    let random = Math.floor(Math.random() * 403)
    setShown(chars[random].name)
    setModal(true)
  }

  return (
    <>
     <div className={`${modal ? '' : 'hidden'} bg-black bg-opacity-75 fixed h-screen w-screen`}>
        <div className="flex justify-center space-x-10 mt-32 mx-12">
            <div className="border-2 border-white rounded-xl min-h-[500px] w-1/4">
              <img src={image} alt="Character Image" className="w-full h-full rounded-xl"/>
            </div>
            <div className="border-2 border-white bg-white rounded-xl min-h-[500x] w-2/3 text-black">
                <div className="flex justify-between pt-6 pl-7 pr-5">
                  <div className="flex">
                  <p className="text-4xl font-semibold pr-3">{name}</p>
                  <GenderMale size={24} color="#000000" className={`${gender === "male" ? '' : 'hidden'} my-auto`} />
                  <GenderFemale size={24} color="#000000" className={`${gender === "male" ? 'hidden' : ''} my-auto`}/>
                  </div>
                  <p className="text-2xl hover:cursor-pointer" onClick={() => setModal(false)}>x</p>
                </div>
                <div className="flex space-x-20">
                <div className="px-8 capitalize space-y-4 pt-16 text-lg">
                  <p>{`Date of Birth: ${dob}`}</p>
                  <p>{`Species: ${species}`}</p>
                  <p>{`Eye Color: ${eye}`}</p>
                  <p>{`Hair Color: ${hair}`}</p>
                  <p>{alive ? "Alive" : "Dead"}</p>
                </div>
                <div className="capitalize space-y-4 pt-16 text-lg pr-10">
                  <p>{`House: ${house}`}</p>
                  <p>{`Ancestry: ${anc}`}</p>
                  <p>{`Patronus: ${patronus}`}</p>
                  <p>{`Wizard Status: ${wiz ? "Wizard" : "Not a Wizard"}`}</p>
                  <p>{`Hogwart Status: ${student ? 'Student' : 'N/A'} ${staff ? 'Staff' : ''}`}</p>
                </div>
                </div>
               
            </div>
        </div>
        </div>
      <nav className="mx-20 flex justify-between">
        <p className="text-6xl font-bold text-yellow-300 pt-6">Harry's World</p>
        <div className="mx-28 flex mt-8 mb-2">
          <div className="bg-white bg-opacity-10 border-white border-2 rounded-xl flex px-3 py-2 hover:cursor-pointer" onClick={handleShuffle}>
            <p className="text-white my-auto">Random Character</p>
            <Shuffle size={32} color="#fcfcfc" className=""/>
            </div>
        </div>
      </nav>
      <div>
        <div className="mx-24 flex justify-end mt-6 mb-10">
        <input type="search" className="my-auto rounded-xl w-60 h-8 pl-3" placeholder="Search..." onChange={(e) => setValue(e.target.value)}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-row lg:mx-20 gap-8 mb-20">
            {
              Array.isArray(chars) && chars.filter((item) => {
                if(!value)return true;
                if (
                  item.name.toLowerCase().includes(value.toLowerCase())
                ){
                  return true;
                }
              }).map((char, idx) => 
                <div key={idx} className="border-2 border-white w-72 h-32 flex mx-auto hover:cursor-pointer" onClick={() => {
                  setShown(char.name)
                  setModal(true)
                }}>
                    <img src={char.image} alt="Character Image"/>
                    <div className="text-white my-auto mx-auto">
                        <p className="font-semibold">{char.name}</p>
                        <p className="text-sm">{char.house}</p>
                    </div>
                </div>
              )
            }
        </div>
      </div>
    </>
  );
}
