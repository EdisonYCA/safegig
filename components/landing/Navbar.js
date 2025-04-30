import { Disclosure, DisclosureButton} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { client } from '@/library/thirdwebClient'
import {
  prepareContractCall,
  sendTransaction,
  getContract,
  defineChain
} from "thirdweb";
import { useStateContext } from '@/context/StateContext'
import { registerUserFb } from '@/library/db/work'
import { ConnectButtonWrapper } from '../ConnectButtonWrapper'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({page}) {
  const account = useActiveAccount();
  const {user, setUser} = useStateContext();

  useEffect(() => {
    if (!account) return;
  
    setUser(account);
    console.log(account)

    const registerUser = async () => {
      await registerUserFb(account.address);
  
      const contract = getContract({
        client,
        chain: defineChain(97),
        address: "0x97889EF0B1C33236975F56f33704DafCF4C92FC5",
      });
  
      const transaction = await prepareContractCall({
        contract,
        method: "function createNewUser()",
        params: [],
      });
  
      try {
        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });
      } catch (error) {
        const message = error?.message || "";
  
        if (!message.includes("User already registered")) {
          alert("Transaction failed: " + message);
        }
      }
    };
  
    registerUser();

  }, [account]);


  return (
    <Disclosure as="nav" className="bg-sky-blue">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex shrink-0 items-center">
              <a href="/" className="text-2xl font-bold">
                SafeGig
              </a>
            </div>
            {
              page == "dashboard" ? 
              <>
              <div className="flex">
                <ConnectButtonWrapper/>
                <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user ? user : "Jane"}`}
                      className="size-12 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            </> : account ? <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                    <button
                      className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Log Out 
                    </button>
                  </div>
              </div> : null
            }
          </div>
        </div>
      </div>
    </Disclosure>
  )
}