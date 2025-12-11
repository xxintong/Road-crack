import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, RefreshCw, BarChart2, Check, AlertCircle } from 'lucide-react';
import { SimulationResult } from '../types';

export const CrackDetectionDemo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Reset state
      setResult(null);
      setProcessedImageUrl(null);
    }
  };

  const simulateProcessing = () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setResult(null);
    setProcessedImageUrl(null);

    // Simulate network/processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      // Mock metrics
      setResult({
        iou: 0.78 + Math.random() * 0.1,
        dice: 0.82 + Math.random() * 0.08,
        f1: 0.81 + Math.random() * 0.09,
        processingTime: 45 + Math.floor(Math.random() * 50)
      });

      // In a real app, this would be the response from the backend
      // Here we just use the original image but apply a CSS filter in the render 
      // to simulate a binary mask or overlay for demonstration purposes.
      // Or we could use a canvas to draw on it.
      // For this demo, we will re-use the preview URL but style it differently.
      setProcessedImageUrl(previewUrl); 

    }, 2000);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">模型推理演示实验室</h2>
            <p className="text-slate-500 text-sm mt-1">上传道路图像，体验模拟裂纹分割过程</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={triggerUpload}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              <span>上传图片</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {previewUrl && (
              <button 
                onClick={simulateProcessing}
                disabled={isProcessing}
                className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>处理中...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>开始检测</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50 min-h-[400px]">
          {!previewUrl ? (
            <div className="h-80 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-white">
               <Upload className="w-12 h-12 mb-4 opacity-50" />
               <p className="text-lg">请上传一张 DeepCrack 或类似的道路裂纹图像</p>
               <p className="text-sm mt-2">支持 JPG, PNG 格式</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                   <h3 className="font-semibold text-slate-700">原始图像</h3>
                   <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">Input</span>
                </div>
                <div className="relative aspect-square bg-black rounded-lg overflow-hidden shadow-inner group">
                   <img src={previewUrl} alt="Original" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Output */}
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <h3 className="font-semibold text-slate-700">分割结果 (掩码)</h3>
                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Prediction</span>
                </div>
                <div className="relative aspect-square bg-black rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-blue-400 font-medium">U-Net 模型推理中...</p>
                    </div>
                  ) : processedImageUrl ? (
                    <>
                      {/* Simulating a mask by using high contrast grayscale filter for demo purposes since we don't have backend */}
                      <img 
                        src={processedImageUrl} 
                        alt="Result" 
                        className="w-full h-full object-cover grayscale contrast-[2.5] brightness-150 invert" 
                      />
                      <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-overlay"></div>
                    </>
                  ) : (
                    <div className="text-slate-500 flex flex-col items-center">
                      <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">等待处理</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Footer */}
        {result && (
          <div className="p-6 bg-white border-t border-slate-200 animate-slide-up">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              定量评估结果 (模拟)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-xs text-blue-600 font-medium mb-1">IoU (交并比)</p>
                <p className="text-2xl font-bold text-blue-800">{(result.iou * 100).toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                <p className="text-xs text-indigo-600 font-medium mb-1">Dice 系数</p>
                <p className="text-2xl font-bold text-indigo-800">{(result.dice * 100).toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-lg bg-teal-50 border border-teal-100">
                <p className="text-xs text-teal-600 font-medium mb-1">F1 Score</p>
                <p className="text-2xl font-bold text-teal-800">{(result.f1 * 100).toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-600 font-medium mb-1">推理耗时</p>
                <p className="text-2xl font-bold text-slate-800">{result.processingTime}ms</p>
              </div>
            </div>
            <div className="mt-4 flex items-start space-x-2 text-xs text-slate-400 bg-slate-50 p-3 rounded">
               <AlertCircle className="w-4 h-4 flex-shrink-0" />
               <p>注意：由于本演示为前端模拟环境，并未连接真实的 Python 后端模型。显示的分割结果是基于图像处理算法模拟生成的，评估指标为基于 DeepCrack 平均性能的模拟值。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};