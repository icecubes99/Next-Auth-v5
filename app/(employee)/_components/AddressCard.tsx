"use client"
import React, { useEffect, useState } from 'react';
import { getAddress } from '@/actions/readAddress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import AddAddressButton from './AddAddressButton';

const AddressCard = ({ userId }: { userId: string }) => {
    const [address, setAddress] = useState<any>(null);
    const [error, setError] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        const fetchAddress = async () => {
            setLoading(true);
            const data = await getAddress(userId);
            if (data.error) {
                setError(data.error);
            } else {
                setAddress(data.data);
            }
            setLoading(false);
        };

        fetchAddress();
    }, [userId]);

    if (!isMounted) {
        return null; // Render nothing on the server
    }

    return (
        <Card>
            <CardHeader>
                <p>Address Information</p>
                <CardDescription>
                    <p>Here is the address information for the user.</p>
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <div className='flex flex-col gap-4'>
                        {error}
                        <AddAddressButton />
                    </div>
                ) : (
                    <>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>STREET:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.street}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>BARANGAY:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.barangay}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>CITY:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.city}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>PROVINCE:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.province}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>COUNTRY:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.country}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='text-sm font-medium'>ZIP CODE:</p>
                            <p className='text-md font-mono max-w-[250px] bg-slate-100 truncate p-1 rounded-md'>
                                {address?.zipCode}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className='justify-end'>
                <AddAddressButton />
            </CardFooter>
        </Card>
    );
};

export default AddressCard;